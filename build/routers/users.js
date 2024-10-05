"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const multer_1 = require("../constants/multer");
const controller = __importStar(require("../controllers/users"));
const validate = __importStar(require("../validations/validationChains"));
// Creación del router del recurso [Votante].
exports.usersRouter = (0, express_1.Router)();
// Middleware para las rustas siguientes.
exports.usersRouter.use([middlewares_1.validarJWT]);
// Ruta para actualizar los datos de un [Votante] por su {id}.
exports.usersRouter.put('/:id', multer_1.upload.single('image'), validate.votersUpdateValidationChain, controller.updateVoter);
// Ruta para eliminar un [Votante] por su {id}.
exports.usersRouter.delete('/:id', validate.idParamValidationChain, controller.deleteVoter);
// Middleware para las rustas siguientes.
exports.usersRouter.use([middlewares_1.validateRole]);
// Ruta para editar la información del admin.
exports.usersRouter.put('/updateAdmin', validate.adminUpdateValidationChain, controller.updateAdmin);
// Ruta para devolver todos los [Votantes] de un {Municipio} de la {Provincia}.
exports.usersRouter.get('/:province/:town', validate.townAndProvinceParamValidationChain, controller.getVotersForTownInProvince);
