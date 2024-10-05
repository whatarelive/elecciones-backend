"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomErrors_1 = require("../errors/CustomErrors");
// Middleware para validar el token que se recibe en la petición.
const validarJWT = (req, res, next) => {
    // Se recupera el token de los headers de la petición. 
    const token = req.header('x-token');
    try {
        // Si no viene el token, lanzamos un error de Auth.
        if (!token)
            throw new CustomErrors_1.AuthError(400, 'No hay un token en la petición.');
        // Verificamos el token usando la palabra secreta y extraemos la data del payload.
        const data = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED);
        const { uid, name, role } = data;
        // Establecemos las propiedades siguientes en los headers de la petición.
        // De forma que se puedan recuperar más adelante de ser necesario. 
        req.headers['uid'] = uid;
        req.headers['name'] = name;
        req.headers['role'] = role;
    }
    catch (error) {
        // Si el error no es una instancia de AuthError se establece un mensaje y statusCode por defecto. 
        const msgError = error instanceof CustomErrors_1.AuthError ? error.message : 'Token invalido.';
        const status = error instanceof CustomErrors_1.AuthError ? error.status : 401;
        return res.status(status).json({
            ok: false,
            msg: msgError,
        });
    }
    next();
};
exports.validarJWT = validarJWT;
