import express from "express";
import { registerUser, loginUser, resetPassword } from "../controller/authController.js"; // Ruta correcta a los controladores
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resetPassword", resetPassword);

export default router;