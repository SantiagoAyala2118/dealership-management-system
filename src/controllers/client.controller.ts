import type { Request, Response } from "express";
import { insertClient, getClients } from "../services/clientService.js";

//* Controlador para crear un cliente
export const createClientController = async (req: Request, res: Response) => {
  try {
    const client = await insertClient(req.body);

    return res.status(201).json({
      ok: true,
      msg: "Cliente creado correctamente",
      data: client,
    });
  } catch (err: any) {
    console.log("Server error", err);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};

//* Controlador para listar los clientes
export const listClientsController = async (req: Request, res: Response) => {
  try {
    const clients = await getClients();

    return res.status(200).json({
      ok: true,
      msg: "Estos son los clientes",
      data: clients,
    });
  } catch (err: any) {
    console.error("Server error", err);
    return res.status(500).json({
      ok: false,
      msg: "Server error",
    });
  }
};
