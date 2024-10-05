"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicParams = void 0;
// Objeto con las propiedades comunes entre los modelos actuales.
exports.basicParams = {
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    image_path: {
        required: true,
        type: String
    },
    image_publicId: {
        required: true,
        type: String
    },
    province: {
        required: true,
        type: String
    },
    town: {
        required: true,
        type: String
    },
};
