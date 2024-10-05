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
exports.authRouter = void 0;
const express_1 = require("express");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const controller = __importStar(require("../controllers/auth"));
const validate = __importStar(require("../validations/validationChains"));
// Creación del router del recurso [Autentificación].
exports.authRouter = (0, express_1.Router)();
// Ruta para que un votante inicie sesion.
exports.authRouter.post('/loginVoter', validate.votersLoginValidationChain, controller.loginVoter);
// Ruta para crear un nuevo [Votante].
exports.authRouter.post('/registerVoter', validate.votersCreateValidationChain, controller.registerVoter);
// Ruta para que un admin inicie sesion.
exports.authRouter.post('/loginAdmin', validate.adminLoginValidationChain, controller.loginAdmin);
// Ruta para revalidar JSON Web Token.
exports.authRouter.post('/renew', [validate_jwt_1.validarJWT], controller.revalidateJWT);
