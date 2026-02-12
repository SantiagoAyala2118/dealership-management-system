import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const insertSale = async (body) => {
    const { precioFinal, autoId, clienteId, usuarioId } = body;
    const userId = Number(usuarioId);
    const correctPrice = precioFinal;
    if (correctPrice <= 0) {
        throw new Error("INVALID_PRICE_VALUE");
    }
    const carIdExisting = await prisma.auto.findFirst({
        where: { id: autoId, estado: "DISPONIBLE" },
    });
    if (!carIdExisting) {
        throw new Error("CAR_NOT_FOUND");
    }
    const clientIdExisting = await prisma.cliente.findUnique({
        where: { id: clienteId },
    });
    if (!clientIdExisting) {
        throw new Error("CLIENT_NOT_FOUND");
    }
    const userIdExisting = await prisma.usuario.findUnique({
        where: { id: Number(userId) },
    });
    if (!userIdExisting) {
        throw new Error("USER_NOT_FOUND");
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
