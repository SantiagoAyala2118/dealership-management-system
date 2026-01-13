# 1. Imagen base: Usamos una versión ligera de Node (alpine)
FROM node:24-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos primero los package.json (para aprovechar la caché de Docker)
COPY package*.json ./

# Copiamos TAMBIÉN la carpeta de prisma antes de instalar
COPY prisma ./prisma/

# 4. Instalamos las dependencias
RUN npm install

# Generamos el cliente de Prisma compatible con Linux (gracias al binaryTargets que pusimos antes)
RUN npx prisma generate

# 5. Copiamos el resto del código fuente
COPY . .

# 6. Exponemos el puerto donde corre tu app (ej: 3000)
EXPOSE 3000

# 7. Comando para iniciar la app (modo desarrollo)
CMD ["npm", "run", "dev"]