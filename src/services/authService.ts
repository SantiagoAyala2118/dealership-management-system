import { PrismaClient } from "@prisma/client";

import { generateToken } from "../utils/jwt.handle.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.handle.js";

const prisma = new PrismaClient();

//* Interface para definir los datos que se necesitan para la creacion y login de usuario
interface BaseDataUser {
  username: string;
  email: string;
  password: string;
  rol: string;
}

//* Seccionamiento del login con el register
type loginData = Pick<BaseDataUser, "email" | "password">; //? Solo necesito el email y la password

type registerData = Omit<BaseDataUser, "rol">; //? No necesito el rol

//* Registro
export const register = async ({ email, password, username }: registerData) => {
  const existingEmail = await prisma.usuario.findUnique({ where: { email } });

  if (existingEmail) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.usuario.create({
    data: {
      nombre: username,
      email: email,
      password: hashedPassword,
      rol: "VENDEDOR",
    },
  });

  const { password: _, ...restOfData } = newUser;

  return restOfData;
};

//* Login
export const login = async ({ email, password }: loginData) => {
  const verifyEmail = await prisma.usuario.findUnique({ where: { email } });

  if (!verifyEmail) {
    throw new Error("Credenciales incorrectas");
  }

  const userPassword = verifyEmail.password;

  const verifyPassword = await comparePassword(password, userPassword);

  if (!verifyPassword) {
    throw new Error("Credenciales invalidas");
  }

  const token = await generateToken(verifyEmail.id, email, verifyEmail.rol);

  return token;
};
