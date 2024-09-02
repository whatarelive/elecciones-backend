"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const diputados_1 = require("./routers/diputados");
// Creacion de la aplicacion de Express.
const app = (0, express_1.default)();
// Configuariones de seguridad.
app.disable('x-powered-by');
// Middlewares
app.use(express_1.default.json()); // Configuracion para convertir el body a JSON.
app.use((0, cors_1.default)()); // Configuracion previa de Cors.
// Configuracion de Routers.
app.use('/api/diputado', diputados_1.diputadosRouter); // Responde a todas las rutas del recurso [diputados].
// Configuracion del puerto de escucha.
(0, dotenv_1.config)();
const PORT = process.env.PORT ?? 4001;
// Creacion del puerto de escucha de la aplicacion de Express.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
