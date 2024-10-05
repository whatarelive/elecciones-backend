"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProvince = void 0;
// Validación custom para comprobar el valor del campo { province } en los Enpoints de Votantes y Diputados.  
const isProvince = ({ data, validRegion }) => {
    // Transformación de la cadena de texto.
    const dataTrim = data.toLowerCase().trim().replace(/\s/g, '');
    let provinceTrim;
    // Se va a buscar en el modelo de datos de las provincias, la cadena de texto que se proporciono.
    return validRegion.find((e) => {
        // Transformación de la cadena de texto de la provincia extraída del modelo de datos.
        provinceTrim = e.province.toLowerCase().replace(/\s/g, '');
        // Si ambas coinciden, esta cadena de texto, va a ser una provincia valida. 
        return provinceTrim === dataTrim;
    });
};
exports.isProvince = isProvince;
