import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CarBody {
  marca: string;
  modelo: string;
  anio: number;
  precioLista: number;
}

export const insertCar = async (car: CarBody) => {
  const addCar = await prisma.auto.create({
    data: car,
  });
  return addCar;
};

export const getCars = async () => {
  const cars = await prisma.auto.findMany({});

  return cars;
};
