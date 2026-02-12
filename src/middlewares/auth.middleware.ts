import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle.js";
import type { JwtPayload } from "jsonwebtoken";

//* Interface para agregarle un campo al tipo Request y que TS no se queje
export interface ExtRequest extends Request {
  userLogged?: string | JwtPayload;
}

export const authMiddleware = async (
  req: ExtRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    //* Accedo al token mediante el authorization
    const authHeader = req.headers.authorization || "";

    //* Lo divido y excluyo el 'Bearer'
    const jwt = authHeader.split(" ").pop();

    //* Ejecuto la funcion para verificar si el token es mio
    const token = await verifyToken(`${jwt}`);

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No authenticated",
      });
    }

    req.userLogged = token;

    next();
  } catch (err) {
    console.error("Error en el middleware de autenticacion", err);
    return res.status(500).json({
      status: "error",
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
