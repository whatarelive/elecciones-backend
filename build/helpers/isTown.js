"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTown = void 0;
// Validación custom para comprobar el valor del campo { town } en los Enpoints de Votantes y Diputados.  
const isTown = ({ data, validRegion }) => {
    // Transformación de la cadena de texto.
    const dataTrim = data.toLowerCase().trim().replace(/\s/g, '');
    // Se va a buscar en el modelo de datos de las provincias, la cadena de texto que se proporciono 
    for (const { towns } of validRegion) {
        // si existe en los municipios validos.
        if (existsTown(dataTrim, towns))
            return true;
    }
};
exports.isTown = isTown;
// Función auxiliar para comprobar si la cadena de texto existe en el arreglo de municipios.
const existsTown = (dataTrim, towns) => {
    let townTrim;
    // Se va a buscar en el arreglo de municipios, la cadena de texto que se proporciono 
    return towns.find(town => {
        // Transformación de la cadena de texto del valor de la iteración.
        townTrim = town.toLowerCase().replace(/\s/g, '');
        // Si ambas coinciden, esta cadena de texto, va a ser un municipio valido. 
        return townTrim === dataTrim;
    });
};
