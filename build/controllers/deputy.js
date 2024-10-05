"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeputy = exports.updateDeputy = exports.createDeputy = exports.getDeputiesForProvince = exports.getDeputies = void 0;
const model_1 = require("../model");
const helpers_1 = require("../helpers");
const CustomErrors_1 = require("../errors/CustomErrors");
// Controlador para recuperar todos los diputados.
const getDeputies = async (req, res) => {
    // Extraemos los querys de paginación de los elementos.
    const { page, limit } = req.query;
    try {
        // Se realiza el calculo de las propiedades de paginación.
        const { skip, limitNumber } = (0, helpers_1.handlerPaginate)({ page, limit });
        // Se extraen todos los diputados de la base de datos.
        const deputies = await model_1.DeputyModel.find().skip(skip).limit(limitNumber);
        // Calculamos la cantidad de diputados en la Base de Datos. 
        const totalDeputies = await model_1.DeputyModel.countDocuments();
        res.json({
            ok: true,
            deputies,
            totalElements: totalDeputies
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.getDeputies = getDeputies;
// Controlador para recuperar los diputados por provincia.
const getDeputiesForProvince = async (req, res) => {
    // Extraemos el parametro de busqueda de la request.
    const { province } = req.params;
    // Extraemos los querys de paginación de los elementos.
    const { page, limit } = req.query;
    try {
        // Se realiza el calculo de las propiedades de paginación.
        const { skip, limitNumber } = (0, helpers_1.handlerPaginate)({ page, limit });
        // Extraemos los diputados desde la base de datos filtrando por provincia.
        const deputies = await model_1.DeputyModel.find({ province }).skip(skip).limit(limitNumber);
        // Calculamos la cantidad de diputados en la Base de Datos. 
        const totalDeputies = await model_1.DeputyModel.countDocuments({ province });
        res.json({
            ok: true,
            deputies,
            totalElement: totalDeputies
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.getDeputiesForProvince = getDeputiesForProvince;
// Controlador para crear un nuevo diputado.
const createDeputy = async (req, res) => {
    // Extraemos los datos necesarios del cuerpo de la request.
    const { name, age, position, province, town, biography } = req.body;
    try {
        // Buscamos al diputado en la base de datos por el nombre. 
        let deputy = await model_1.DeputyModel.findOne({ name });
        // Si el diputado ya esxiste en la base de datos, lanzamos un error de Resource.
        if (deputy)
            throw new CustomErrors_1.ResourceError(400, 'El diputado ya existe en el sistema.');
        // Subimos la imagen a Cloudinary.
        const { image_path, image_publicId } = await (0, helpers_1.uploadImage)({ image: req.file });
        // Creamos el nuevo objeto diputado.
        const newDeputy = new model_1.DeputyModel({
            name, age,
            image_path, image_publicId,
            position, province, town,
            biography, votes: 0
        });
        // Guardamos el diputado en la Base de Datos.
        deputy = await newDeputy.save();
        res.status(201).json({
            ok: true,
            deputy,
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.createDeputy = createDeputy;
// Controlador para editar la información de un diputado.
const updateDeputy = async (req, res) => {
    // Recuperamos el id del diputado de los params de la request.
    const deputyId = req.params.id;
    try {
        // Buscamos al diputado con ese id en la base de datos.
        let deputy = await model_1.DeputyModel.findById(deputyId);
        // Si no existe el diputado, lanzamos un error de Resource.
        if (!deputy)
            throw new CustomErrors_1.ResourceError(404, `No se encontro el diputado con el id: ${deputyId}`);
        // Extraemos los datos necesarios del cuerpo de la request.
        const { name, age, position, province, town, biography, votes } = req.body;
        // Remplazamos la imagen en Cloudinary.
        const { image_path, image_publicId } = await (0, helpers_1.updateImage)({ image: req.file, model: deputy });
        // Creamos el nuevo objeto diputado.
        const newDeputy = {
            name, age,
            image_path,
            image_publicId,
            position, province, town,
            biography, votes
        };
        // Buscamos y actualizamos el diputado en la base de datos.
        deputy = await model_1.DeputyModel.findByIdAndUpdate(deputyId, newDeputy, { new: true });
        res.json({
            ok: true,
            deputy,
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.updateDeputy = updateDeputy;
// Controlador para eliminar un diputado a través del id.
const deleteDeputy = async (req, res) => {
    // Recuperamos el id del diputado de los params de la request.
    const deputyId = req.params.id;
    try {
        // Buscamos al diputado con ese id en la base de datos.
        let deputy = await model_1.DeputyModel.findById(deputyId);
        // Si no existe el diputado, lanzamos un error de Resource.
        if (!deputy)
            throw new CustomErrors_1.ResourceError(404, `No se encontro al diputado con el id ${deputyId}`);
        // Eliminar la imagen de Cloudinary. 
        await (0, helpers_1.deleteImage)({
            publicId: deputy.image_publicId,
            imagePath: deputy.image_path
        });
        // Buscamos y eliminamos el diputado de la base de datos.
        await model_1.DeputyModel.findByIdAndDelete(deputyId);
        res.json({
            ok: true,
            message: `Diputado ${deputyId} eliminado`,
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.deleteDeputy = deleteDeputy;
