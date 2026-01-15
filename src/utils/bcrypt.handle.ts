import bcrypt from "bcryptjs";
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const verified = await bcrypt.compare(password, hashedPassword);
  return verified;
};
