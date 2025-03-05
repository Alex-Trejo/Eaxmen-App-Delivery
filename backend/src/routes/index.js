import express from "express";
import authRoute from "./routes/authRoute.js"; // Ruta correcta a authRoute.js
import userRoute from "./routes/userRoutes.js"; // Ruta correcta a userRoutes.js
import dishRoute from './routes/dishRoutes.js'
import lunchRoute from "./routes/lunchRoutes.js"; // Ruta correcta a lunchRoutes.
import adminRoute from './routes/adminRoute.js'
import motorizedRoute from './routes/motorizedRoute.js'
import ordersRoute from './routes/ordersRoute.js'

const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use('/dishes', dishRoute);
router.use("/lunches", lunchRoute);
router.use('/admin', adminRoute)
router.use('/motorized', motorizedRoute);
router.use('/orders', ordersRoute);


export default router;
