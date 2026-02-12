import { insertSale } from "../services/saleService.js";
//* Controlador para crear una venta
export const createSaleController = async (req, res) => {
    try {
        const { id } = req.userLogged;
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
    }
    catch (err) {
        const errorMessage = err.message;
        //* Verificador de errores para enviar mensajes de error correctos
        switch (errorMessage) {
            case "INVALID_PRICE_VALUE":
                return res.status(400).json({
                    ok: false,
                    msg: "El precio de venta debe ser mayor a 0",
                });
            case "INVALID_DISCOUNT_VALUE":
                return res.status(400).json({
                    ok: false,
                    msg: "El descuento maximo es de hasta el 10%",
                });
            case "POSSIBLE_PRICE_MISTAKE":
                return res.status(400).json({
                    ok: false,
                    msg: "Posible error de tipeo en el precio",
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
