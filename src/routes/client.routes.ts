import { Router } from "express";

//? Schema
import { clientSchema } from "../schemas/client.schema.js";

//? Middlewares
import { validateSchema } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

//? Controladores
import {
  createClientController,
  listClientsController,
} from "../controllers/client.controller.js";

const clientRouter = Router();

clientRouter.post(
  "/create-client",
  authMiddleware,
  validateSchema(clientSchema),
  createClientController,
);

clientRouter.get("/get-clients", authMiddleware, listClientsController);

export default clientRouter;
