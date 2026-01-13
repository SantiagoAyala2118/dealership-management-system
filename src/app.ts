import express from "express";
import { type Request, type Response } from "express";
import "dotenv/config";

const app = express();
const PORT = process.env["PORT"];

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor levantado paa");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
