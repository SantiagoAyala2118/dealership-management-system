import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

//* Middlewares
import { validateSchema } from "../middlewares/validator.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateSchema(registerSchema),
  registerController,
);

authRouter.post("/login", validateSchema(loginSchema), loginController);

export default authRouter;
