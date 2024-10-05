"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Funcion de conexión a la base de datos.
const createConnect = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://mern_user:${process.env.DB_PASSWORD}@eleccionesdb.0osgy.mongodb.net/`);
        console.log('DB online...');
    }
    catch (error) {
        console.log(error);
        console.log('No se pudo inicializar la BD.');
    }
};
exports.createConnect = createConnect;
