"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVoter = exports.updateAdmin = exports.updateVoter = exports.getVotersForTownInProvince = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const model_1 = require("../model");
const helpers_1 = require("../helpers");
const CustomErrors_1 = require("../errors/CustomErrors");
const contants_json_1 = __importDefault(require("../constants/contants.json"));
// Controlador para recuperar los votantes por provincias y municipios.
const getVotersForTownInProvince = async (req, res) => {
    // Extraemos los parametros de busquedad de los param de la request.
    const { province, town } = req.params;
    // Extraemos los querys de paginación de los elementos.
    const { page, limit } = req.query;
    try {
        // Se realiza el calculo de las propiedades de paginación.
        const { skip, limitNumber } = (0, helpers_1.handlerPaginate)({ page, limit });
        // Recuperamos la region{provincia + municipios} (escrita correctamente) de las constantes.
        const region = contants_json_1.default.filter(v => v.province.replace(/\s/g, '').toLowerCase() === province).pop();
        // Extraemos el municipio (escrita correctamente).
        const searchTown = region?.towns.filter(v => v.replace(/\s/g, '').toLowerCase() === town).pop();
        // Buscamos los votantes segun la provincia y el municipio. 
        const voters = await model_1.VoterModel.find({
            province: region?.province,
            town: searchTown
        }).skip(skip).limit(limitNumber);
        // Calculamos la cantidad de diputados en la Base de Datos. 
        const totalVoters = await model_1.VoterModel.countDocuments({
            province: region?.province,
            town: searchTown
        });
        // Si no hay votantes, lanzamos un error de Resource.
        if (!voters)
            throw new CustomErrors_1.ResourceError(404, `No se encontraron votantes del municipio ${searchTown} de la provincia: ${region?.province}`);
        res.json({
            ok: true,
            voters,
            totalElements: totalVoters
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.getVotersForTownInProvince = getVotersForTownInProvince;
// Controlador para editar la información de un votante. 
const updateVoter = async (req, res) => {
    // Recuperamos el id del diputado de los params de la request.
    const voterId = req.params.id;
    try {
        // Buscamos el votante por su id en la base de datos. 
        let voter = await model_1.VoterModel.findById(voterId);
        // Si el votante no existe, lanzamos un error de Resource
        if (!voter)
            throw new CustomErrors_1.ResourceError(404, `No se encontro al votante con el id: ${voterId}`);
        // Desestructuramos los datos necesarios de la request.body.
        const { name, age, ci, province, town, isValidVoter } = req.body;
        // Remplazamos la imagen en Cloudinary.
        const { image_path, image_publicId } = await (0, helpers_1.updateImage)({ image: req.file, model: voter });
        // Creamos el nuevo objeto del votante.
        const newVoter = {
            name, age, ci,
            image_path, image_publicId,
            province, town,
            isValidVoter
        };
        // Buscamos y actualizmos el votante en la base de datos. 
        voter = await model_1.VoterModel.findByIdAndUpdate(voterId, newVoter, { new: true });
        res.json({
            ok: true,
            voter,
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.updateVoter = updateVoter;
// Controlador para actualizar la informacion del Admin.
const updateAdmin = async (req, res) => {
    // Extraemos los datos necesarios del cuerpo de la request.
    const { id } = req.body;
    try {
        // Buscamos el admin con el name proporcionado.
        let admin = await model_1.AdminModel.findById(id);
        // Si el admin no existe lanzamos un error de Auth.
        if (!admin)
            throw new CustomErrors_1.ResourceError(404, `El no puede modificar un admin que no existe.`);
        // Desestructuramos los datos necesarios de la request.body.
        const { name, password } = req.body;
        // Creamos el nuevo objeto admin.
        const newAdmin = { name, password };
        // Generación del patron de encriptación.
        const salt = bcryptjs_1.default.genSaltSync();
        // Encriptacion de la contraseña.
        newAdmin.password = bcryptjs_1.default.hashSync(password, salt);
        // Buscamos y actualizamos el admin en la BD.
        admin = await model_1.AdminModel.findByIdAndUpdate(id, newAdmin, { new: true });
        // Despues de comprobar todos los datos, creamos el token para el nuevo admin. 
        const token = await (0, helpers_1.createJwt)({ name, uid: admin._id, role: 'Admin' });
        res.json({
            ok: true,
            admin,
            token
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.updateAdmin = updateAdmin;
// Controlador para eliminar un votante.
const deleteVoter = async (req, res) => {
    // Extraemos la id del voter de los parametros de la request.
    const voterId = req.params.id;
    try {
        // Buscamos el votante en la base de datos.
        let voter = await model_1.VoterModel.findById(voterId);
        // Si no existe, lanzamos un error de Resource.
        if (!voter)
            throw new CustomErrors_1.ResourceError(404, `No se encontro al votante con el id: ${voterId}`);
        // Eliminamosla imagen de Cloudinary 
        await (0, helpers_1.deleteImage)({
            publicId: voter.image_publicId,
            imagePath: voter.image_path
        });
        // Buscamos y eliminamos el votante de la base de datos.
        await model_1.VoterModel.findByIdAndDelete(voterId);
        res.json({
            ok: true,
            message: `Votante eliminado con el id: ${voterId}`,
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.deleteVoter = deleteVoter;
