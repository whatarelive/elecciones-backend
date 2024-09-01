import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { deputyRouter } from "./routers/deputy";

// Creacion de la aplicacion de Express.
const app = express();

// Configuariones de seguridad.
app.disable("x-powered-by");

// Middlewares
app.use(express.json()); // Configuracion para convertir el body a JSON.
app.use(cors()); // Configuracion previa de Cors.

// Configuracion de Routers.
app.use("/api/diputado", deputyRouter); // Responde a todas las rutas del recurso [diputados].

// Configuracion del puerto de escucha.
config();

// Creacion del puerto de escucha de la aplicacion de Express.
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
