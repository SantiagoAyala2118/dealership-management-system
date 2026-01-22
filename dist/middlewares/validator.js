//* MIDDLEWARE DE VALIDACION PARECIDO AL DE EXPRESS-VALIDATOR, PERO ESTE TIENE TODO EN UN SOLO MIDDLEWARE
import { ZodType, ZodError } from "zod";
//* Funcion encargada de recibir el esquema
export const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            //* Se usa schema.parseAsync para evaluar si el body concuerda con el schema
            await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            console.log("ERROOOOR", error);
            //* Se captura la instancia del error (true o false)
            if (error instanceof ZodError) {
                //* Mapeamos los errores
                const errorMessages = error.issues?.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                }));
                //* Se le da forma a los errores
                return res.status(400).json({
                    status: "error",
                    errors: errorMessages,
                });
            }
            return res.status(500).send("Error interno de validación");
        }
    };
};
