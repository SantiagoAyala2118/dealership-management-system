import { Router } from "express";
import authRouter from "./auth.routes.js";
import carRouter from "./car.routes.js";

const router = Router();

router.use(authRouter);

router.use(carRouter);

export default router;
