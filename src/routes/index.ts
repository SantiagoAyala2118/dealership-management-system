import { Router } from "express";
import authRouter from "./auth.routes.js";
import carRouter from "./car.routes.js";
import clientRouter from "./client.routes.js";
import saleRouter from "./sale.routes.js";

const router = Router();

router.use(authRouter);

router.use(carRouter);

router.use(clientRouter);

router.use(saleRouter);

export default router;
