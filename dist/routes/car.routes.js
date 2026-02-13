import { Router } from "express";
//* Controladores
import { createCarController, getCarsController, } from "../controllers/car.controller.js";
//* Middlewares
import { validateSchema } from "../middlewares/validator.js";
import { carSchema } from "../schemas/car.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const carRouter = Router();
carRouter.post("/car", authMiddleware, validateSchema(carSchema), createCarController);
carRouter.get("/get-cars", getCarsController);
export default carRouter;
