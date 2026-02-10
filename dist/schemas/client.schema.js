import { z } from "zod";
export const clientSchema = z.object({
    nombre: z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 letras" }),
    apellido: z
        .string()
        .min(3, { message: "El apellido debe tener al menos 3 letras" }),
    dni: z.string().min(8, { message: "El DNI debe ser de al menos 8 cifras" }),
    //*Opcionales
    telefono: z.string().optional(),
    email: z.email({ message: "Formato de email incorrecto" }).optional(),
});
