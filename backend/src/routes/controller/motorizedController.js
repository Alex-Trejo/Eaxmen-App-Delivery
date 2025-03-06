import { fs } from '../../database/firebase.js';
import { collection, getDocs, getDoc, doc, addDoc, query, where} from 'firebase/firestore';

export async function getAllMotorized(req, res) {
    try {
        const userRef = collection(fs, "usuario");

        // Consulta para filtrar solo los usuarios con role === "motorizado"
        const q = query(userRef, where("role", "==", "motorizado"));
        const userSnapshot = await getDocs(q);

        let allMotorized = userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return res.status(200).json(allMotorized);

    } catch (error) {
        console.error("Error al obtener los motorizados:", error);
        return res.status(500).json({
            message: "Error al obtener los motorizados",
            error: error.message
        });
    }
}