"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = void 0;
const helpers_1 = require("../helpers");
const CustomErrors_1 = require("../errors/CustomErrors");
// Fución para comprobar el nivel de seguridad del usuario usando la propiedad { Role }.
const validateRole = (req, res, next) => {
    try {
        // Recuperamos el rol del user o admin extraido del token en los headers.
        const role = req.header('role');
        // Comprobamos que tengan la autorizacion requerida el token.
        if (role !== 'Admin')
            throw new CustomErrors_1.AuthError(401, 'Autorizacion erronea.');
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
    next();
};
exports.validateRole = validateRole;
