import { register, login } from "../services/authService.js";
export const registerController = async (req, res) => {
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
    }
    catch (err) {
        return res.status(500).json({
            ok: false,
            msg: "Server error",
        });
    }
};
