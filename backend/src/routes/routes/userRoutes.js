import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser, updateUserRole } from "../controller/userController.js"; // Ajusta la ruta según tu estructura de carpetas

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id/role", updateUserRole); // Nueva ruta para actualizar el rol del usuario

export default router;
