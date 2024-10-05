"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const middlewares_1 = require("./middlewares");
const config_1 = require("./database/config");
const config_2 = require("./images/config");
const routers_1 = require("./routers");
// Creación de la aplicación de Express.
const app = (0, express_1.default)();
// Configuraciones de seguridad.
app.disable('x-powered-by');
// Middlewares
app.use(express_1.default.json()); // Configuración para convertir el body a JSON.
app.use((0, middlewares_1.validateCors)()); // Configuración completa de CORS.
// permite la lectura de archivos .env
(0, dotenv_1.config)();
// Establece la configuración de conexión a Cloudinary.  
(0, config_2.cloudinaryConfig)();
// Establecer conexion con la Base de Datos de MongoDB.
(0, config_1.createConnect)();
// Configuración de Routers.
app.use('/api/auth', routers_1.authRouter); // Responde a todas las rutas para autentificación.
app.use('/api/deputies', routers_1.deputiesRouter); // Responde a todas las rutas del recurso [diputados].
app.use('/api/user', routers_1.usersRouter); // Responde a todas las rutas del recurso [usuarios].
app.use('/api/votes', routers_1.votesRouter); // Responde a todas las rutas del recurso [Votación].
// Creación del puerto de escucha de la aplicación de Express.
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
