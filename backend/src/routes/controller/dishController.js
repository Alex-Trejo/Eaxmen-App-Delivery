import { fs } from '../../database/firebase.js';
import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, query, where } from 'firebase/firestore';

//Agregar Platillo
export async function createDish(req, res) {
    try{
        
        const { nombre, descripcion, precio } = req.body;

        if(!nombre || !descripcion || !precio){
            return res.status(400).json({ message: "Por favor complete todos los campos" });
        }

        const dishesRef = collection(fs, "productos");

        const dishSnapshot = await query(dishesRef, where("nombre", "==",  nombre));
        const nameQuerySnapshot = await getDocs(dishSnapshot);
        if(!nameQuerySnapshot.empty){
            return res.status(401).send({ message: "El platillo ya existe" });
        }

        const dishData = { nombre, descripcion, precio}

        const docRef = await addDoc(dishesRef, dishData);
        
        return res.status(201).json({ message: "Platillo Creado Exitosamente", nombre: docRef.name });

    }catch(error){
        
        console.error("Error al crear platillo", error);
        return res.status(500).json({ message: "Error al crear platillo", error: error.message });

    }

}

//Obtener Todos los platillos
export async function getAllDishes(req, res){

    try{
        const dishesRef = collection(fs, 'productos');
        const snapshot = await getDocs(dishesRef);

        const dishes = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        return res.status(200).json(dishes);

    }catch(error){
        console.error("Error al obtener platillos", error);
        return res.status(500).json({
            message: "Error al obtener los platillos", 
            error: error.message
        });
    }
}

//Obtener el platillo por el ID
export async function getDishById(req, res){
    
    try{
        const dishId = req.params.id;
        const dishRef = doc(fs, "productos", dishId);
        const dishSnap = await getDoc(dishRef);

        if(!dishSnap.exists()){
            return res.status(404).json({ message: "Platillo no encontrado" });
        }

        return res.status(200).json({
            id: dishSnap.id, ...dishSnap.data()
        });
    }catch(error){
        console.log("Error al conseguir el platillo", error);
        return res.status(500).json({
            message: "Error al obtener el platillo",
            error: error.message
        });
    }
}

//Actualizar solo el platilo
export async function updateDish(req, res){
    try {
        const dishId = req.params.id;
        const dishData = req.body;
        const dishRef = doc(fs, "productos", dishId)
        
        await updateDoc(dishRef, dishData)

        return res.status(200).json({
            message: "Platillo actualizado correctamente",
        })
    } catch (error) {
        console.log("No se pudo actualizar el platillo", error)
        return res.status(500).json({
            message: "No se pudo actualizar el platillo",
            error: error.message
        })
    }
}

//Eliminar un platillo
export async function deleteDish(req, res){
    try {
        const dishId = req.params.id;
        const dishRef = doc(fs, "productos", dishId);
        await deleteDoc(dishRef);

        return res.status(200).json({
            message: "Platillo Eliminado"
        });
        
    } catch (error) {
        console.log("Error al eliminar el platillo", error);
        return res.status(500).json({
            message: "Error al eliminar el plato",
            error: error.message
        })
    }
}

