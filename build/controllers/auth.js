"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateJWT = exports.loginAdmin = exports.loginVoter = exports.registerVoter = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const model_1 = require("../model");
const helpers_1 = require("../helpers");
const CustomErrors_1 = require("../errors/CustomErrors");
// Controlador para agregar un nuevo Votante.
const registerVoter = async (req, res) => {
    // Extraemos los datos necesarios del cuerpo de la request.
    const { name, age, ci, province, town, } = req.body;
    try {
        // Buscamos el votante con el # de carnet proporcionado.
        let voter = await model_1.VoterModel.findOne({ ci });
        // Si el votante ya existe en la Base de datos, lanzamos un error de Resource. 
        if (voter)
            throw new CustomErrors_1.ResourceError(400, 'El votante ya existe en el sistema.');
        // Creamos la imagen por defecto al votante.
        const { image_path, image_publicId } = {
            image_path: process.env.DEFAULT_IMAGE_URL,
            image_publicId: process.env.DEFAULT_IMAGE_PUBLIC_ID,
        };
        // Creacion del nuevo votante.
        const newVoter = new model_1.VoterModel({
            name, age, ci,
            image_path, image_publicId,
            province, town,
            isValidVoter: true
        });
        // Se realiza el guardado en la Base de datos.
        voter = await newVoter.save();
        // Despues de guardar el votante, creamos el token para el votante con el rol de Usuario. 
        const token = await (0, helpers_1.createJwt)({ uid: voter._id, name, role: 'User' });
        res.status(201).json({
            ok: true,
            voter,
            token
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.registerVoter = registerVoter;
// Controlador para verificar el inicio de Sesion de los Votantes.
const loginVoter = async (req, res) => {
    // Extraemos los datos necesarios del cuerpo de la request.
    const { name, ci } = req.body;
    try {
        // Buscamos el voter con el name proporcionado.
        const voter = await model_1.VoterModel.findOne({ name });
        // Si el votante no existe en la Base de Datos, lanzamos un error de Resource.
        if (!voter)
            throw new CustomErrors_1.ResourceError(404, `El votante con el nombre: ${name} no existe.`);
        // Si los valores de CI no son iguales lanzamos un error de Auth.
        if (ci.trim() !== voter.ci)
            throw new CustomErrors_1.AuthError(400, `El numero de carnet: ${ci} no es valido.`);
        // Despues de comprobar todos los datos, creamos el token para el votante con el rol de Usuario. 
        const token = await (0, helpers_1.createJwt)({ uid: voter._id, name, role: 'User' });
        res.json({
            ok: true,
            voter,
            token
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.loginVoter = loginVoter;
// Controlador para verificar el inicio de Sesion del Admin.
const loginAdmin = async (req, res) => {
    // Extraemos los datos necesarios del cuerpo de la request.
    const { name, password } = req.body;
    try {
        // Buscamos el admin con el name proporcionado.
        const admin = await model_1.AdminModel.findOne({ name });
        // Si el admin no existe lanzamos un error de Auth.
        if (!admin)
            throw new CustomErrors_1.ResourceError(404, `El admin con el nombre: ${name} no existe.`);
        // Comprobamos que ambas contraseñas sean iguales despues de desencriptar la almacenada en la BD.
        const validPassword = bcryptjs_1.default.compareSync(password, admin.password);
        // Si la constraseñas no son iguales lanzamos un error de Auth.
        if (!validPassword)
            throw new CustomErrors_1.AuthError(400, 'La contraseña es incorrecta.');
        // Despues de comprobar todos los datos, creamos el token para el admin, con el rol de Administrador. 
        const token = await (0, helpers_1.createJwt)({ name, uid: admin._id, role: 'Admin' });
        res.json({
            ok: true,
            token
        });
    }
    catch (error) {
        // Manejo especial del error
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.loginAdmin = loginAdmin;
// Controlador para regenerar un nuevo Token. 
const revalidateJWT = async (req, res) => {
    // Recuperamos los datos del token anterior establecidos en los headers de la request.
    const uid = req.header('uid');
    const name = req.header('name');
    const role = req.header('role');
    try {
        // Comprobación estricta del type de la propiedad role.
        if (!(0, helpers_1.isRole)(role))
            throw new CustomErrors_1.AuthError(401, 'Role invalido.');
        // Comprobación de que se establecio el nombre de usuario que solicita el token. 
        if (!name)
            throw new CustomErrors_1.AuthError(401, 'No se puede crear el token para un usuario desconocido');
        // Creacion del nuevo token.
        const newToken = await (0, helpers_1.createJwt)({ uid, name, role });
        res.json({
            ok: true,
            token: newToken
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.revalidateJWT = revalidateJWT;
