import express from "express";
import { createLunch, getLunches, getLunchById, getLunchByCategory, updateLunch, updateLunchStatus, deleteLunch } from "../controller/lunchController.js";

const router = express.Router();

router.post("/", createLunch);
router.get("/", getLunches);
router.get("/:id", getLunchById);
router.get("/category/:category/", getLunchByCategory);
router.put("/:id", updateLunch);
router.patch("/:id", updateLunchStatus);
router.delete("/:id", deleteLunch);

export default router;