import { collection, getDocs, getDoc, doc, updateDoc, deleteDoc, addDoc, query, where } from "firebase/firestore";
import { fs } from "../../database/firebase.js";

export async function createOrder(req, res) {
    try {
        const { userId,direccion, nombre, apellido, pedido, cantidad, precio, comentario, factura, formaPago, billetePago } = req.body;

        // Validar que `userId` está presente
        if (!userId) {
                return res.status(400).json({ message: "El ID del usuario es obligatorio" });
        }

        // Validar los campos obligatorios
        if (!direccion || !nombre || !apellido || !pedido || !cantidad || !precio || !formaPago) {
            return res.status(400).json({ message: "Todos los campos obligatorios deben ser completados" });
        }

        let facturaData = null; // Variable para almacenar la factura procesada
        let billetePagoData = billetePago;

        // Manejar el caso de pago con transferencia sin factura
        if (formaPago === "transferencia" && !factura) {
            facturaData = "Pago con transferencia";
            billetePagoData = "Pago con transferencia";
        }

        // Manejar el caso de pago en efectivo sin factura
        if (formaPago === "efectivo" && !factura) {
            facturaData = "Pago en efectivo";
        }

        // Si la forma de pago es efectivo, el billetePago es obligatorio y debe ser múltiplo de 5
        if (formaPago === "efectivo") {
            if (!billetePago) {
                return res.status(400).json({ message: "Debe proporcionar el billete con el que va a pagar" });
            }
            if (billetePago % 5 !== 0) {
                return res.status(400).json({ message: "El billete de pago debe ser múltiplo de 5" });
            }
        }

        // Si el usuario habilitó la factura, debe proporcionar los datos obligatorios
        if (factura && typeof factura === "object") {
            if (!factura.cedulaRuc || !factura.numeroCelular || !factura.correo || !factura.direccion) {
                return res.status(400).json({ message: "Los datos de la factura son obligatorios" });
            }
            // Guardar la factura correctamente
            facturaData = {
                cedulaRuc: factura.cedulaRuc,
                numeroCelular: factura.numeroCelular,
                correo: factura.correo,
                direccion: factura.direccion,
                formaPago
            };
        }

        // Construcción del objeto de orden
        const orderData = {
            userId, // Asociar pedido con usuario
            direccion,
            nombre,
            apellido,
            pedido,
            cantidad,
            precio,
            comentario: comentario || "",
            factura: facturaData, // Se asigna el valor procesado
            formaPago,
            billetePago: billetePagoData, // Se asigna el valor procesado
            vuelto: formaPago === "efectivo" ? billetePago - precio : 0 ,// Calcula el vuelto si es efectivo
            status:"Recibido",
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
//Obtener pedidos de un usuario específico
    export async function getOrders(req, res) {
        try {
            const { userId } = req.query; // Obtener userId desde los parámetros de la URL

            if (!userId) {
                return res.status(400).json({ message: "El ID del usuario es obligatorio" });
            }

            const orderRef = collection(fs, "pedido");
            const q = query(orderRef, where("userId", "==", userId));
            const snapshot = await getDocs(q);

            const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            return res.status(200).json(orders);
        } catch (error) {
            console.error("Error al obtener pedidos", error);
            return res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
       }
    }

    // Obtener todos los pedidos (para el administrador)
    export async function getAllOrders(req, res) {
        try {
            const orderRef = collection(fs, "pedido");
            const snapshot = await getDocs(orderRef);
    
            const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            return res.status(200).json(orders);
        } catch (error) {
            console.error("Error al obtener todos los pedidos", error);
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

        const validStatuses = ["Recibido", "Preparación", "En camino", "Entregado"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Estado no válido" });
        }

        const orderRef = doc(fs, "pedido", orderId);
        await updateDoc(orderRef, { status });

        return res.status(200).json({ message: `Estado del pedido actualizado a '${status}'` });
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

// Asignar motorizado a un pedido
export async function assignMotorized(req, res) {
    try {
        const { orderId, motorizedId } = req.body;

        if (!orderId || !motorizedId) {
            return res.status(400).json({ message: "Los IDs de pedido y motorizado son obligatorios" });
        }

        // Referencia a la colección de usuarios
        const usersRef = collection(fs, "usuario");

        // Consultar los usuarios con el rol de 'motorizado'
        const q = query(usersRef, where("role", "==", "motorizado"));
        const querySnapshot = await getDocs(q);

        // Verificar si el motorizado con el ID existe
        if (querySnapshot.empty) {
            console.log(`No se encontró un motorizado con ID ${motorizedId}`);
            return res.status(404).json({ message: "El motorizado no existe o no tiene el rol adecuado" });
        }

        // Verificar si el pedido existe
        const orderRef = doc(fs, "pedido", orderId);
        const orderSnap = await getDoc(orderRef);
        if (!orderSnap.exists()) {
            return res.status(404).json({ message: "El pedido no existe" });
        }

        // Actualizar el pedido con el ID del motorizado
        await updateDoc(orderRef, { motorizadoId });

        return res.status(200).json({
            message: "Motorizado asignado exitosamente",
            orderId,
            motorizedId,
        });

    } catch (error) {
        console.error("Error al asignar motorizado:", error);
        return res.status(500).json({ message: "Error al asignar motorizado", error: error.message });
    }
}