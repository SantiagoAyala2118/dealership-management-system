import { insertClient, getClients } from "../services/clientService.js";
//* Controlador para crear un cliente
export const createClientController = async (req, res) => {
    try {
        const client = await insertClient(req.body);
        return res.status(201).json({
            ok: true,
            msg: "Cliente creado correctamente",
            data: client,
        });
    }
    catch (err) {
        console.log("Server error", err);
        return res.status(500).json({
            ok: false,
            msg: "Server error",
        });
    }
};
//* Controlador para listar los clientes
export const listClientsController = async (req, res) => {
    try {
        const clients = await getClients();
        return res.status(200).json({
            ok: true,
            msg: "Estos son los clientes",
            data: clients,
        });
    }
    catch (err) {
        console.error("Server error", err);
        return res.status(500).json({
            ok: false,
            msg: "Server error",
        });
    }
};
