import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const insertSale = async (body) => {
    const { precioFinal, autoId, clienteId, usuarioId } = body;
    const correctPrice = precioFinal;
    if (correctPrice <= 0) {
        throw new Error("El precio final debe ser un valor mayor a cero");
    }
    const carIdExisting = await prisma.auto.findFirst({
        where: { id: autoId, estado: "DISPONIBLE" },
    });
    if (!carIdExisting) {
        throw new Error("El auto que se intenta vender no existe en la BD");
    }
    const clientIdExisting = await prisma.cliente.findUnique({
        where: { id: clienteId },
    });
    if (!clientIdExisting) {
        throw new Error("El cliente que figura en la venta no existe en la BD");
    }
    const userIdExisting = await prisma.usuario.findUnique({
        where: { id: usuarioId },
    });
    if (!userIdExisting) {
        throw new Error("El vendedor que figura en la venta no existe en la BD");
    }
    const createSale = await prisma.$transaction([
        prisma.venta.create({
            data: { precioFinal, autoId, clienteId, usuarioId },
        }),
        prisma.auto.update({
            where: { id: autoId },
            data: { estado: "VENDIDO" },
        }),
    ]);
    return createSale[0];
};
