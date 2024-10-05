"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.updateImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
/**
 * Modulo para manejar el trabajo con imagenes con el servicio de Cloudinary.
**/
// Función para subir una nueva imagen a Cloudinary. 
const uploadImage = async ({ image }) => {
    let result;
    // Si existe la imagen se guarda en Cloudinary
    if (image) {
        result = await cloudinary_1.v2.uploader.upload(image.path);
        cloudinary_1.v2.url(result.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });
    }
    // Dependiendo de la existencia de la imagen, se usan las propiedades de {result} o del {process.env}
    const image_path = image ? result?.secure_url : process.env.DEFAULT_IMAGE_URL;
    const image_publicId = image ? result?.public_id : process.env.DEFAULT_IMAGE_PUBLIC_ID;
    return {
        image_path: image_path,
        image_publicId: image_publicId
    };
};
exports.uploadImage = uploadImage;
// Función para remplazar una nueva imagen en Cloudinary. 
const updateImage = async ({ image, model }) => {
    // Si existe una imagen en la request.
    // Primero eliminamos la imagen guardada en Cloudinary. 
    let result;
    if (image) {
        await (0, exports.deleteImage)({
            publicId: model.image_publicId,
            imagePath: model.image_path
        });
        result = await (0, exports.uploadImage)({ image });
    }
    // luego subimos la nueva imagen a Cloudinary. 
    return result
        || {
            image_path: model.image_path,
            image_publicId: model.image_publicId
        };
};
exports.updateImage = updateImage;
// Función para eliminar una nueva imagen en Cloudinary.
const deleteImage = async ({ publicId, imagePath }) => {
    // Si su path es distinto al de la imagen base.
    if (imagePath !== process.env.DEFAULT_IMAGE_URL) {
        // Eliminamos la imagen guardada en Cloudinary.
        await cloudinary_1.v2.uploader.destroy(publicId);
    }
};
exports.deleteImage = deleteImage;
