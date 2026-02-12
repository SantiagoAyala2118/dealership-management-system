import type { Response } from "express";
import { insertSale } from "../services/saleService.js";

//? Importacion de la interfaz que trae los datos del usuario
import type { JwtPayload } from "jsonwebtoken";
import type { ExtRequest } from "../middlewares/auth.middleware.js";

//* Controlador para crear una venta
export const createSaleController = async (req: ExtRequest, res: Response) => {
  try {
    const { id } = req.userLogged as JwtPayload;

    const dataToService = {
      ...req.body,
      usuarioId: id,
    };

    const sale = await insertSale(dataToService);

    return res.status(201).json({
      ok: true,
      msg: "Venta creada correctamente",
      data: sale,
    });
  } catch (err: any) {
    const errorMessage = err.message;

    //* Verificador de errores para enviar mensajes de error correctos
    switch (errorMessage) {
      case "INVALID_PRICE_VALUE":
        return res.status(400).json({
          ok: false,
          msg: "El precio de venta debe ser mayor a 0",
        });

      case "CAR_NOT_FOUND":
        return res.status(404).json({
          ok: false,
          msg: "El auto no se encuentra en la base de datos",
        });

      case "CLIENT_NOT_FOUND":
        return res.status(404).json({
          ok: false,
          msg: "Cliente no encontrado en la base de datos",
        });
    }

    console.error("ERROR creando una venta", err);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};
