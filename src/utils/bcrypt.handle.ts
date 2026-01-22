import bcrypt from "bcryptjs";
const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

//* Funcion para hashear la contrasenia del usuario
export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

//* Funcion para comparar las contrasenias
export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const verified = await bcrypt.compare(password, hashedPassword);
  return verified;
};
