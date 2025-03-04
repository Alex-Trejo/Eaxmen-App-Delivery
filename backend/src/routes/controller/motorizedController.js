import { fs } from '../../database/firebase.js';
import { collection, getDocs, getDoc, doc, addDoc, query, where} from 'firebase/firestore';

export async function getAllMotorized(req, res){

    try {
        
        const userRef = collection(fs, 'usuario');
        const userSnapshot = await getDocs(userRef);

        let allMotorized = [];

        for(const userDoc of userSnapshot.docs){
            
            const motorizedRef = collection(userDoc.ref, 'motorizado');
            
            const motorizedSnapshot = await getDocs(motorizedRef);

            motorizedSnapshot.forEach(doc => {
                allMotorized.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
        }
        
        return res.status(200).json(allMotorized);

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({
            message: "Error al obtener los motorizados",
            error: error.message
        })
    }
}