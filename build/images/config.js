"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
// Configuración de las variables de conexión al servicio de cloudinary.
const cloudinaryConfig = () => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
    console.log('Server is conect the Cloudinary service...');
};
exports.cloudinaryConfig = cloudinaryConfig;
