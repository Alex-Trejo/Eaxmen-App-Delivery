import express from 'express';
import { getAllMotorized } from '../controller/motorizedController.js';

const router = express.Router();

router.get('/', getAllMotorized);

export default router