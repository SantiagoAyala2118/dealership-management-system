import express from "express";
import { type Request, type Response } from "express";
import "dotenv/config";
import router from "./routes/index.js";

const app = express();
app.use(express.json());

const PORT = process.env["PORT"];

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor levantado paa");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
