import { login, register } from "../services/authService.js";
//* Controlador de registro
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
        console.error("error", err);
        return res.status(500).json({
            ok: false,
            msg: "Server error",
        });
    }
};
//* Controlador de login
export const loginController = async (req, res) => {
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
    }
    catch (err) {
        if (err.message === "Credenciales incorrectas" ||
            err.message === "Credenciales invalidas") {
            //TODO Esto deberia ir en un middleware
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
export const authorizationTest = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            ok: true,
            msg: "El testeo funciono bro, sirve el middleware",
            user: user,
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
