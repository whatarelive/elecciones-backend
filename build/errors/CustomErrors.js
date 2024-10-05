"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceError = exports.AuthError = void 0;
// Clase para manejar errores con propiedades especiales. 
class CustomError extends Error {
    status; // statusCode de la response.
    type; // Tipo de error lanzado.
    constructor(type, message, status) {
        super(message);
        this.type = type;
        this.status = status;
    }
}
// Clase para manejar errores provenientes de la autentificación. 
class AuthError extends CustomError {
    constructor(status, message) {
        super('Not-Authenticate', message, status);
    }
}
exports.AuthError = AuthError;
// Clase para manejar errores provenientes de la indexación y manejo de recursos. 
class ResourceError extends CustomError {
    constructor(status, message) {
        super('Invalid Resource', message, status);
    }
}
exports.ResourceError = ResourceError;
