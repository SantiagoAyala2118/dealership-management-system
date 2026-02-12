import type { Request, Response } from "express";

import { login, register } from "../services/authService.js";
import { error } from "node:console";

//* Controlador de registro
export const registerController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userRegister = await register({ username, email, password });
    if (userRegister) {
      return res.status(201).json({
        ok: true,
        msg: "Usuario creado correctamente",
        data: userRegister,
      });
    }
  } catch (err: any) {
    const errorMessage = err.message;

    if (errorMessage == "EMAIL_ALREADY_EXISTS") {
      return res.status(400).json({
        ok: false,
        msg: "Ese email ya se encuentra en uso",
      });
    }

    console.error("error", err);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

//* Controlador de login
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userLogged = await login({ email, password });

    if (userLogged) {
      return res.status(200).json({
        ok: true,
        msg: "Login exitoso",
        token: userLogged,
      });
    }
  } catch (err: any) {
    const errorMessage = err.message;

    if (
      errorMessage === "Credenciales incorrectas" ||
      errorMessage === "Credenciales invalidas"
    ) {
      return res.status(401).json({
        ok: false,
        msg: "Email o contraseña incorrectos",
      });
    }

    console.error(err);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const authorizationTest = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    res.status(200).json({
      ok: true,
      msg: "El testeo funciono bro, sirve el middleware",
      user: user,
    });
  } catch (err: any) {
    console.error("ERROR", err);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};
