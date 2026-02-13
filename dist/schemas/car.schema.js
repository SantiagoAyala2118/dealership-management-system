import { z } from "zod";
export const carSchema = z.object({
    marca: z.string().min(3, {
        message: "La marca del vehiculo debe tener al menos 3 caracteres",
    }),
    modelo: z.string().min(3, {
        message: "El modelo del vehiculo debe tener al menos 3 caracteres",
    }),
    anio: z
        .int()
        .min(1886, { message: "El anio minimo del modelo debe ser 1886" })
        .max(2026, { message: "El anio maximo del modelo debe ser 2026" }),
    precioLista: z
        .float32()
        .min(999, { message: "El preio minimo del vehiculo debe ser de $999" }),
});
