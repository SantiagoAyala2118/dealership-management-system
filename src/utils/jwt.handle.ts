import jwt from "jsonwebtoken";
const JWT_SIGNATURE = process.env.JWT_SECRET || "my_super_sectr3t_token";

//* Funcion para generar el token del usuario
export const generateToken = async (
  id: number,
  role: string,
  email: string
) => {
  const signToken = jwt.sign({ id, role, email }, JWT_SIGNATURE, {
    expiresIn: "10h",
  });

  return signToken;
};

//* Funcion para verificar que el token es mio
export const verifyToken = async (token: string) => {
  const isOk = jwt.verify(token, JWT_SIGNATURE);
  return isOk;
};
