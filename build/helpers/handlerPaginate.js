"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerPaginate = void 0;
// Funcion auxiliar para extraer la logica del calculo de la paginación. 
const handlerPaginate = ({ page, limit }) => {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    return {
        skip,
        limitNumber
    };
};
exports.handlerPaginate = handlerPaginate;
