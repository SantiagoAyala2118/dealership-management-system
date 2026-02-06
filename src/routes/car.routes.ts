import { Router } from "express";
import {
  createCarController,
  getCarsController,
} from "../controllers/car.controller.js";
import { validateSchema } from "../middlewares/validator.js";

const carRouter = Router();

carRouter.post("/car", createCarController);

carRouter.get("get-cars", getCarsController);

export default carRouter;
