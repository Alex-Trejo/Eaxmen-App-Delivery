import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, query, where } from "firebase/firestore";
import { fs } from "../../database/firebase.js";

export async function createOrder(req, res) {
    try {
        const { 
            direccion, nombre, apellido, pedido, cantidad, precio, 
            comentario, factura, formaPago, billetePago 
        } = req.body;

        // Validar los campos obligatorios
        if (!direccion || !nombre || !apellido || !pedido || !cantidad || !precio || !formaPago) {
            return res.status(400).json({ message: "Todos los campos obligatorios deben ser completados" });
        }

        // Validar los datos de la factura
        if (!factura || !factura.cedulaRuc || !factura.numeroCelular || !factura.correo || !factura.direccion) {
            return res.status(400).json({ message: "Los datos de la factura son obligatorios" });
        }

        // Si la forma de pago es efectivo, el billetePago es obligatorio
        if (formaPago === "efectivo" && !billetePago) {
            return res.status(400).json({ message: "Debe proporcionar el billete con el que va a pagar" });
        }

        // Construcción del objeto de orden
        const orderData = {
            direccion,
            nombre,
            apellido,
            pedido,
            cantidad,
            precio,
            comentario: comentario || "",
            factura: {
                cedulaRuc: factura.cedulaRuc,
                numeroCelular: factura.numeroCelular,
                correo: factura.correo,
                direccion: factura.direccion
            },
            formaPago,
            billetePago: formaPago === "efectivo" ? billetePago : null, // Solo se guarda si es efectivo
            vuelto: formaPago === "efectivo" ? billetePago - precio : 0 // Calcula el vuelto si es efectivo
        };

        // Guardar en Firestore
        const orderRef = collection(fs, "pedido");
        const docRef = await addDoc(orderRef, orderData);

        return res.status(201).json({ 
            message: "Pedido creado exitosamente", 
            orderId: docRef.id,
            vuelto: orderData.vuelto // Devuelve el vuelto si aplica
        });
    } catch (error) {
        console.error("Error al crear pedido", error);
        return res.status(500).json({ message: "Error al crear pedido", error: error.message });
    }
}

export async function getOrders(req, res) {
    try {
        const orderRef = collection(fs, "pedido");
        const snapshot = await getDocs(orderRef);

        const orderes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return res.status(200).json(orderes);
    } catch (error) {
        console.error("Error al obtener pedidos", error);
        return res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
    }
}

export async function getOrderId(req, res) {
    try {
        const orderId = req.params.id;
        const orderRef = doc(fs, "pedido", orderId);
        const orderSnap = await getDoc(orderRef);

        if (!orderSnap.exists()) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        return res.status(200).json({ id: orderSnap.id, ...orderSnap.data() });
    } catch (error) {
        console.error("Error al obtener pedido", error);
        return res.status(500).json({ message: "Error al obtener pedido", error: error.message });
    }
}



export async function updateOrder(req, res) {
    try {
        const orderId = req.params.id;
        const orderData = req.body;
        const orderRef = doc(fs, "pedido", orderId);
        await updateDoc(orderRef, orderData);

        return res.status(200).json({ message: "Pedido actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar pedido", error);
        return res.status(500).json({ message: "Error al actualizar pedido", error: error.message });
    }
}


export async function updateOrderStatus(req, res) {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "El estado del pedido es obligatorio" });
        }

        const orderRef = doc(fs, "pedido", orderId);
        await updateDoc(orderRef, { status });

        return res.status(200).json({ message: "Estado del pedido actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar estado de pedido", error);
        return res.status(500).json({ message: "Error al actualizar estado de pedido", error: error.message });
    }
}

export async function deleteOrder(req, res) {
    try {
        const orderId = req.params.id;
        const orderRef = doc(fs, "pedido", orderId);
        await deleteDoc(orderRef);

        return res.status(200).json({ message: "Pedido eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar pedido", error);
        return res.status(500).json({ message: "Error al eliminar pedido", error: error.message });
    }
}
