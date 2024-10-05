"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateField = void 0;
const express_validator_1 = require("express-validator");
// Funcion para comprobar si no se encontraron errores en las validaciones de las peticiones.
const validateField = (req, res, next) => {
    // Se recuperan los resultados de las validaciones de la request.
    const errors = (0, express_validator_1.validationResult)(req);
    // Si existen errores se le envia una respuesta al cliente.
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            // Se envia los errores en forma de arreglo de objetos
            errors: errors.array()
        });
    }
    next();
};
exports.validateField = validateField;
