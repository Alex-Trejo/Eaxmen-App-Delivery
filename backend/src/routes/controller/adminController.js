import bcrypt from "bcrypt";
import { fs } from '../../database/firebase.js';
import { collection, addDoc} from 'firebase/firestore';

//Agregar Administrador
export async function createAdmin(req, res){
    
    try {
        const { email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Por favor complete todos los campos" });
        }

        const adminRef = collection(fs, "administrador");

        
        const encryptedPassword = bcrypt.hashSync(password, 10);
        
        const adminData = {
            email,
            password: encryptedPassword,
            rol: "administrador"
        };
        
        const docRef = await addDoc(adminRef, adminData);

        return res.status(201).json({ message: "Administrador Creado Exitosamente", id: docRef.id });

    } catch (error) {
        console.log("Error al crear el Administrador", error);
        return res.status(500).json({ message: "Error al crear el Administrador", error: error.message });
    }
}