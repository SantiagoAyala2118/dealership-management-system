import { PrismaClient } from "@prisma/client";
import type { Venta } from "@prisma/client";

const prisma = new PrismaClient();

export const insertSale = async (body: Venta) => {
  const { precioFinal, autoId, clienteId, usuarioId } = body;

  const userId = Number(usuarioId);

  if (precioFinal <= 0) {
    throw new Error("INVALID_PRICE_VALUE");
  }

  //* VERIFICACIONES
  const aviableCar = await prisma.auto.findFirst({
    where: { id: autoId, estado: "DISPONIBLE" },
  });
  if (!aviableCar) {
    throw new Error("CAR_NOT_FOUND");
  }

  //? Descuento maximo del 10%
  const minPrice = aviableCar.precioLista * 0.9;
  if (precioFinal < minPrice) {
    throw new Error("INVALID_DISCOUNT_VALUE");
  }

  //? Verificaciones de precio
  if (precioFinal > aviableCar.precioLista) {
    if (precioFinal >= aviableCar.precioLista * 10) {
      throw new Error("POSSIBLE_PRICE_MISTAKE");
    }
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

  //* TRANSACCION
  const createSale = await prisma.$transaction([
    prisma.venta.create({
      data: { precioFinal, autoId, clienteId, usuarioId: userId },
    }),
    prisma.auto.update({
      where: { id: autoId },
      data: { estado: "VENDIDO" },
    }),
  ]);

  //? Retorno el primer elemento para que salga solo el registro de la venta
  return createSale[0];
};
