import { type Cliente, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//* Servicio de insertar cliente
export const insertClient = async (body: Cliente) => {
  const clientExists = await prisma.cliente.findUnique({
    where: { dni: body.dni },
  });

  if (clientExists) {
    throw new Error("Ese DNI ya esta registrado en la BD");
  }

  const client = await prisma.cliente.create({ data: body });
  return client;
};

//*Servicio de traer a los clientes
export const getClients = async () => {
  try {
    const clients = await prisma.cliente.findMany({
      orderBy: { apellido: "asc" },
    });
    return clients;
  } catch (err) {
    console.error("ERROR al traer a los clientes", err);
  }
};
