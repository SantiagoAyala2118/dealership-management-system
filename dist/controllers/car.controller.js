import { insertCar, getCars } from "../services/carService.js";
export const createCarController = async (req, res) => {
    try {
        const car = await insertCar(req.body);
        return res.status(201).json({
            ok: true,
            msg: "Car added",
            data: car,
        });
    }
    catch (err) {
        console.error("ERROR", err);
        return res.status(500).json({
            ok: false,
            msg: "Server error",
        });
    }
};
export const getCarsController = async (req, res) => {
    try {
        const cars = await getCars();
        return res.status(200).json({
            ok: true,
            msg: "Here are the cars",
            data: cars,
        });
    }
    catch (err) {
        console.error("ERROR", err);
        return res.status(500).json({
            ok: false,
            msg: "Server error",
        });
    }
};
