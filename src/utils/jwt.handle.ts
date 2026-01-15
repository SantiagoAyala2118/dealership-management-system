import jwt from "jsonwebtoken";
const JWT_SIGNATURE = process.env.JWT_SECRET || "my_super_sectr3t_token";

export const generateToken = async (
  id: number,
  role: string,
  email: string
) => {
  const signToken = await jwt.sign({ id, role, email }, JWT_SIGNATURE, {
    expiresIn: "10h",
  });

  return signToken;
};

export const verifyToken = async (token: string) => {
  const isOk = jwt.verify(token, JWT_SIGNATURE);
  return isOk;
};
