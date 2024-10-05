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
exports.deputiesRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const multer_1 = require("../constants/multer");
const controller = __importStar(require("../controllers/deputy"));
const validate = __importStar(require("../validations/validationChains"));
// Creación del router del recurso [Diputado].
exports.deputiesRouter = (0, express_1.Router)();
// Ruta para devolver todos los [Diputado].
exports.deputiesRouter.get('/', controller.getDeputies);
// Ruta para devolver todos los [Diputado] de una {provincia}.
exports.deputiesRouter.get('/:province', validate.provinceParamValidationChain, controller.getDeputiesForProvince);
exports.deputiesRouter.use([middlewares_1.validarJWT, middlewares_1.validateRole]);
// Ruta para crear un nuevo [Diputado].
exports.deputiesRouter.post('/', multer_1.upload.single('image'), validate.deputyCreateValidationChain, controller.createDeputy);
// Ruta para actualizar un [Diputado] por su {id}.
exports.deputiesRouter.put('/:id', multer_1.upload.single('image'), validate.deputyUpdateValidationChain, controller.updateDeputy);
// Ruta para eliminar un [Diputado] por su {id}.
exports.deputiesRouter.delete('/:id', validate.idParamValidationChain, controller.deleteDeputy);
