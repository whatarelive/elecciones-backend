"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Función para crear un JSON-WEB-TOKEN para el usuario. 
const createJwt = ({ uid, name, role }) => {
    // Se trabaja con promesas para poder hacer una implementación asíncrona.
    // Debido a que la librería no consta con una implementación de este tipo.
    return new Promise((resolve, reject) => {
        // Contrucción del objeto payload del Token. 
        const payload = { uid, name, role };
        // Firma del payload en Token usando la palabra secreta declarada en la variables de entorno.  
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '4h' // Tiempo de vida del Token. 
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject(new Error('No se pudo filmar el token.'));
            }
            // Si se resuelve correctamente la promesa se obtiene el token. 
            resolve(token);
        });
    });
};
exports.createJwt = createJwt;
