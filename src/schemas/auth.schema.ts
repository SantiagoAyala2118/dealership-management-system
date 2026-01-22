import { z } from "zod";

//* Schema para REGISTRO
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),

  email: z.string().email({ message: "Formato de email inválido" }),

  password: z
    .string()
    .min(6, { message: "La contraseña debe tener mínimo 6 caracteres" }),
});

//* Validaciones para LOGIN
export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),

  password: z.string().min(1, { message: "La contraseña es requerida" }),
});
