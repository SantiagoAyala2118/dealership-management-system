import type { Request, Response } from "express";
import { insertSale } from "../services/saleService.js";

//* Controlador para crear una venta
export const createSaleController = async (req: Request, res: Response) => {
  try {
    const sale = await insertSale(req.body);

    return res.status(201).json({
      ok: true,
      msg: "Venta creada correctamente",
      data: sale,
    });
  } catch (err) {
    console.error("ERROR creando una venta", err);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};
