import bcrypt from "bcrypt";
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from "firebase/firestore";
import jwt from "jsonwebtoken";
import { fs } from "../../database/firebase.js";
import admin from "../../database/firebaseAdmin.js";
import nodemailer from 'nodemailer';

const saltRounds = 10;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lanchado10@gmail.com',
        pass: 'alex-89omega'
    }
});

export async function registerUser(req, res) {
    try {
        const userData = req.body;
        const usersRef = collection(fs, "usuario");

        const emailSnapshot = await query(
            usersRef,
            where("email", "==", userData.email)
        );
        const emailQuerySnapshot = await getDocs(emailSnapshot);
        if (!emailQuerySnapshot.empty) {
            return res
                .status(401)
                .send({ message: "El correo electrónico ya está en uso" });
        }

        userData.password = bcrypt.hashSync(userData.password, saltRounds);

        const jsonUser = {};
        for (const [key, value] of Object.entries(userData)) {
            if (value) jsonUser[key] = value;
        }

        const docRef = await addDoc(usersRef, jsonUser);
        return res
            .status(201)
            .json({ message: "Usuario registrado exitosamente", userId: docRef.id });
    } catch (error) {
        console.error("Error general al crear el usuario", error);
        return res
            .status(500)
            .json({ message: "Error al crear el usuario", error: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        const userData = req.body;
        console.log(userData)
        const snapshot = await query(
            collection(fs, "usuario"),
            where("email", "==", userData.email)
        );
        const querySnapshot = await getDocs(snapshot);

        if (querySnapshot.empty) {
            return res.status(401).send({ message: "Email o Contraseña Inválidos", estado: false });
        }

        const user = querySnapshot.docs[0].data();
        user.id = querySnapshot.docs[0].id;

        const secret = process.env.JWT_SECRET;
        if (bcrypt.compareSync(userData.password, user.password)) {
            const token = jwt.sign({ id: user.id, rol: user.roleUser }, secret, { expiresIn: "20h" });
            res.json({ rol: user.role, mensaje: "Usuario Logeado Correctamente", estado: true, usuario: { token }, userId: user.id });
        } else {
            console.log("Contraseña incorrecta");
            res.status(401).send({ message: "Email o Contraseña Inválidos", estado: false });
        }
    } catch (error) {
        console.error("Error en el proceso de login:", error);
        return res.status(500).json({ message: "Error en el proceso de login", error: error.message, estado: false });
    }
}

export const resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const link = await admin.auth().generatePasswordResetLink(email);

        const mailOptions = {
            from: 'lanchado10@gmail.com',
            to: email,
            subject: 'Reestablecer la contraseña',
            text: `Haga click en el siguiente link para reestablecer su contraseña: ${link}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send({ message: 'Error al enviar el correo', error: error.message });
            } else {
                res.status(200).send({ message: 'Correo enviado exitosamente', link });
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Error al enviar el correo', error: error.message });
    }
}

export async function getUserProfile(req, res) {
    try {
        const userId = req.params.id;
        const userRef = doc(fs, "usuario", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        return res.status(200).json(userSnap.data());
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener perfil de usuario", error: error.message });
    }
}

export async function updateUserRole(req, res) {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        const userRef = doc(fs, "usuario", userId);
        await updateDoc(userRef, { role });

        return res.status(200).send({ message: "Rol de usuario actualizado exitosamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar rol de usuario", error: error.message });
    }
}
