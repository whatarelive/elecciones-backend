"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVotesData = exports.setVotesData = exports.setVotes = void 0;
const helpers_1 = require("../helpers");
const model_1 = require("../model");
const CustomErrors_1 = require("../errors/CustomErrors");
// Controlador para manejar las votaciones de los usuarios.
const setVotes = async (req, res) => {
    // Extraemos los ids del body de la requet
    const { voterId, deputyId } = req.body;
    try {
        // Buscamos al votante y al diputado en la base de datos por su ids repectivos.
        let voter = await model_1.VoterModel.findById(voterId);
        const deputy = await model_1.DeputyModel.findById(deputyId);
        // Si el diputado o el votante no existen, lanzamos un error de Resource.
        if (!deputy || !voter)
            throw new CustomErrors_1.ResourceError(404, 'No se encontro el recurso solicitado.');
        // Si el votante no es valido para ejercer el voto se envia un error de Auth.
        if (!voter.isValidVoter)
            throw new CustomErrors_1.AuthError(400, 'El votante no es valido.');
        // Mutamos la propiedad isValidVoter del votante.
        voter.isValidVoter = false;
        // Mutamos e incrementamos en 1 la propiedad votes del diputado.
        deputy.votes = (deputy.votes + 1);
        // Actualización de ambos documentos en la base de datos.
        voter = await model_1.VoterModel.findByIdAndUpdate(voterId, voter, { new: true });
        await model_1.DeputyModel.findByIdAndUpdate(deputyId, deputy, { new: true });
        res.json({
            ok: true,
            msg: 'Voto realizado con exito',
            isValidVoter: voter?.isValidVoter,
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.setVotes = setVotes;
// Controlador para manejar la creación de unas nuevas votaciones.
const setVotesData = async (req, res) => {
    // Extraemos los datos necesarios del body de la request.
    const { elecciones, finalDate } = req.body;
    try {
        // Buscamos la data en la bse de datos segun la propiedad {elecciones}.
        let votacion = await model_1.EleccionesModel.findOne({ elecciones });
        // Si data de la votacion existe, lanzamos un error de Resource.
        if (votacion)
            throw new CustomErrors_1.ResourceError(400, 'El recurso ya existe en la base de datos.');
        // Creamos un nuevo registro de las elecciones.
        const newEleciones = new model_1.EleccionesModel({
            elecciones,
            finalDate,
        });
        // Se guarda el registro en la base de datos
        votacion = await newEleciones.save();
        res.status(201).json({
            ok: true,
            votacion
        });
    }
    catch (error) {
        // Manejo especial del error.
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.setVotesData = setVotesData;
// Controlador para manejar la peticion de la data sobre la votación. 
const getVotesData = async (req, res) => {
    // Extraemos el parametro de busqueda de los params de la request.
    const elecciones = req.params.elecciones;
    try {
        // Buscamos la data en la base de datos usando el parametro de busqueda.
        const data = await model_1.EleccionesModel.findOne({ elecciones });
        // Si no existe esa data, lanzamos un error de Resource.
        if (!data)
            throw new CustomErrors_1.ResourceError(404, 'No existe informacion para esas elecciones.');
        // Hacemos el conteo general de los diputados.
        const cantDeputies = await model_1.DeputyModel.countDocuments();
        // Hacemos el conteo general del total de votos actuales.
        const cantVotes = await model_1.DeputyModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalVotes: { $sum: '$votes' }
                }
            }
        ]);
        // La operación anterior da como resultado un arreglo con un objeto con la operacion de suma, que tiene la propiedades {_id, totalVotes}
        const totalVotes = cantVotes.pop().totalVotes;
        res.json({
            ok: true,
            data: {
                elecciones: data.elecciones,
                finalDate: data.finalDate,
                cantVotes: totalVotes,
                cantDeputies
            }
        });
    }
    catch (error) {
        // Manejo especial del error. 
        return (0, helpers_1.handlerError)({ res, error });
    }
};
exports.getVotesData = getVotesData;
