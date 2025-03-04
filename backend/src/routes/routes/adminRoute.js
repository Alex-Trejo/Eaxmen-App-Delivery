import express from 'express'
import { createAdmin } from '../controller/adminController.js';

const router = express.Router();

router.post("/", createAdmin);

export default router;