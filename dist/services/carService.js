import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const insertCar = async (car) => {
    const addCar = await prisma.auto.create({
        data: car,
    });
    return addCar;
};
export const getCars = async () => {
    const cars = await prisma.auto.findMany({});
    return cars;
};
