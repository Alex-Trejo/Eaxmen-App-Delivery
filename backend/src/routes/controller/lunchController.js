import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, query, where } from "firebase/firestore";
import { fs } from "../../database/firebase.js";

export async function createLunch(req, res) {
    try {
        const lunchData = req.body;
        const lunchRef = collection(fs, "almuerzo");

        const docRef = await addDoc(lunchRef, lunchData);

        return res.status(201).json({ message: "Almuerzo creado exitosamente", lunchId: docRef.id });
    } catch (error) {
        console.error("Error al crear almuerzo", error);
        return res.status(500).json({ message: "Error al crear almuerzo", error: error.message });
    }
}

export async function getLunches(req, res) {
    try {
        const lunchRef = collection(fs, "almuerzo");
        const snapshot = await getDocs(lunchRef);

        const lunches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return res.status(200).json(lunches);
    } catch (error) {
        console.error("Error al obtener almuerzos", error);
        return res.status(500).json({ message: "Error al obtener almuerzos", error: error.message });
    }
}

export async function getLunchById(req, res) {
    try {
        const lunchId = req.params.id;
        const lunchRef = doc(fs, "almuerzo", lunchId);
        const lunchSnap = await getDoc(lunchRef);

        if (!lunchSnap.exists()) {
            return res.status(404).json({ message: "Almuerzo no encontrado" });
        }

        return res.status(200).json({ id: lunchSnap.id, ...lunchSnap.data() });
    } catch (error) {
        console.error("Error al obtener almuerzo", error);
        return res.status(500).json({ message: "Error al obtener almuerzo", error: error.message });
    }
}

export async function getLunchByCategory(req, res) {
    try {
        const category = req.params.category;
        const lunchRef = collection(fs, "almuerzo");
        const q = query(lunchRef, where("category", "==", category));
        const snapshot = await getDocs(q);

        const lunches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return res.status(200).json(lunches);
    } catch (error) {
        console.error("Error al obtener almuerzos por categoría", error);
        return res.status(500).json({ message: "Error al obtener almuerzos por categoría", error: error.message });
    }
}

export async function updateLunch(req, res) {
    try {
        const lunchId = req.params.id;
        const lunchData = req.body;
        const lunchRef = doc(fs, "almuerzo", lunchId);
        await updateDoc(lunchRef, lunchData);

        return res.status(200).json({ message: "Almuerzo actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar almuerzo", error);
        return res.status(500).json({ message: "Error al actualizar almuerzo", error: error.message });
    }
}
export async function updateLunchStatus(req, res) {
    try {
        const lunchId = req.params.id;
        const lunchData = req.body;
        const lunchRef = doc(fs, "almuerzo", lunchId);
        await updateDoc(lunchRef, lunchData);

        return res.status(200).json({ message: "Estado de almuerzo actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar estado de almuerzo", error);
        return res.status(500).json({ message: "Error al actualizar estado de almuerzo", error: error.message });
    }
}

export async function deleteLunch(req, res) {
    try {
        const lunchId = req.params.id;
        const lunchRef = doc(fs, "almuerzo", lunchId);
        await deleteDoc(lunchRef);

        return res.status(200).json({ message: "Almuerzo eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar almuerzo", error);
        return res.status(500).json({ message: "Error al eliminar almuerzo", error: error.message });
    }
}
