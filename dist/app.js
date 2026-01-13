import express from "express";
import {} from "express";
import "dotenv/config";
const app = express();
const PORT = process.env["PORT"];
app.get("/", (req, res) => {
    res.send("Servidor levantado paa");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
