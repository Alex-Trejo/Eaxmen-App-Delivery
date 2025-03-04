import express from 'express';
import { createDish, deleteDish, getAllDishes, getDishById, updateDish} from '../controller/dishController.js';

const router = express.Router();

router.post("/", createDish);
router.get('/', getAllDishes);
router.get("/:id", getDishById);
router.put("/:id", updateDish);
router.delete("/:id", deleteDish);

export default router;