import Router from "express";
//* Middlewares
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.js";
//* Controladores
import { createSaleController } from "../controllers/sale.controller.js";
const saleRouter = Router();
saleRouter.post("/create-sale", authMiddleware, createSaleController);
export default saleRouter;
