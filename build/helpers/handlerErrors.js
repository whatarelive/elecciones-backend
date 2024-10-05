"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerError = void 0;
const CustomErrors_1 = require("../errors/CustomErrors");
// Función para manejar los errores en el servidor. 
const handlerError = ({ res, error }) => {
    // Si el error no es personalizado, se le agregan las propiedades al error.prototype
    if (!(error instanceof CustomErrors_1.AuthError || CustomErrors_1.ResourceError)) {
        error['message'] = 'Por favor contacte con el servicio técnico.';
        error['type'] = 'Internal Server Error';
    }
    // Respuesta que va a recibir el cliente en caso de un error. 
    return res.status(error.status || 500).json({
        ok: false,
        errorType: error.type,
        message: error.message
    });
};
exports.handlerError = handlerError;
