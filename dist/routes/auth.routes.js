import { Router } from "express";
import { authorizationTest, loginController, registerController, } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
//* Middlewares
import { validateSchema } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const authRouter = Router();
authRouter.post("/register", validateSchema(registerSchema), registerController);
authRouter.post("/login", validateSchema(loginSchema), loginController);
authRouter.get("/profile", authMiddleware, authorizationTest);
export default authRouter;
