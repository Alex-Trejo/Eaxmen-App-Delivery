// userController.js

import bcrypt from "bcrypt";
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, query, where } from "firebase/firestore";
import { fs } from "../../database/firebase.js";

// Crear usuario
export async function createUser(req, res) {
    try {
        const userData = req.body;
        const usersRef = collection(fs, "usuario");

        const emailSnapshot = await query(
            usersRef,
            where("email", "==", userData.email)
        );
        const emailQuerySnapshot = await getDocs(emailSnapshot);
        if (!emailQuerySnapshot.empty) {
            return res.status(401).send({ message: "El correo electrónico ya está en uso" });
        }

        userData.password = bcrypt.hashSync(userData.password, 10);
        const docRef = await addDoc(usersRef, userData);

        return res.status(201).json({ message: "Usuario creado exitosamente", userId: docRef.id });
    } catch (error) {
        console.error("Error al crear usuario", error);
        return res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
}

// Leer usuarios
export async function getUsers(req, res) {
    try {
        const usersRef = collection(fs, "usuario");
        const snapshot = await getDocs(usersRef);

        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener usuarios", error);
        return res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
}

// Leer usuario por ID
export async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        const userRef = doc(fs, "usuario", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json({ id: userSnap.id, ...userSnap.data() });
    } catch (error) {
        console.error("Error al obtener usuario", error);
        return res.status(500).json({ message: "Error al obtener usuario", error: error.message });
    }
}

// Actualizar usuario
export async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const userData = req.body;
        
        if (userData.password) {
            userData.password = bcrypt.hashSync(userData.password, 10);
        }
        
        const userRef = doc(fs, "usuario", userId);
        await updateDoc(userRef, userData);

        return res.status(200).json({ 
            message: "Usuario actualizado exitosamente" 
        });
    } catch (error) {
        console.error("Error al actualizar usuario", error);
        return res.status(500).json({ 
            message: "Error al actualizar usuario", 
            error: error.message 
        });
    }
}

// Eliminar usuario
export async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const userRef = doc(fs, "usuario", userId);
        await deleteDoc(userRef);

        return res.status(200).json({ 
            message: "Usuario eliminado exitosamente" 
        });
    } catch (error) {
        console.error("Error al eliminar usuario", error);
        return res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
    }
}

// Actualizar rol del usuario
export async function updateUserRole(req, res) {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        const userRef = doc(fs, "usuario", userId);
        await updateDoc(userRef, { role });

        return res.status(200).json({ message: "Rol de usuario actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar rol de usuario", error);
        return res.status(500).json({ message: "Error al actualizar rol de usuario", error: error.message });
    }
}
