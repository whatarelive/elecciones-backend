"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seVotesDataValidationChain = exports.setVotesValidationChain = exports.adminUpdateValidationChain = exports.adminLoginValidationChain = exports.votersLoginValidationChain = exports.votersUpdateValidationChain = exports.votersCreateValidationChain = exports.deputyUpdateValidationChain = exports.deputyCreateValidationChain = exports.townAndProvinceParamValidationChain = exports.provinceParamValidationChain = exports.idParamValidationChain = void 0;
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const contants_json_1 = __importDefault(require("../constants/contants.json"));
// Validación de los campos: {province} y {town}.
const auxiliaryValidationChain = [
    (0, express_validator_1.body)('province', 'El campo {province} es requerido.')
        .notEmpty()
        .custom((data) => (0, helpers_1.isProvince)({ data, validRegion: contants_json_1.default }))
        .withMessage('El valor del campo {province} no es valido.'),
    (0, express_validator_1.body)('town', 'El campo {province} es requerido.')
        .notEmpty()
        .custom((data) => (0, helpers_1.isTown)({ data, validRegion: contants_json_1.default }))
        .withMessage('El valor del campo {town} no es valido.'),
];
// Validación de los campos: {name} y {age}.
const basicInformationValidationChain = [
    (0, express_validator_1.body)('name').notEmpty()
        .isString()
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('El valor del campo {name} no puede tener caracteres especiales ni números.'),
    (0, express_validator_1.body)('age', 'El campo es requerido.')
        .notEmpty()
        .isInt({ min: 18, max: 95 }),
];
// Validación de Params de la Request: [updateDeputy & deleteDeputy]
exports.idParamValidationChain = [
    (0, express_validator_1.param)('id', 'No es un id valido.').notEmpty().isMongoId(),
    middlewares_1.validateField
];
// Validación de Params de la Request: [getDeputiesForProvince]
exports.provinceParamValidationChain = [
    (0, express_validator_1.param)('province', 'El campo {province} es requerido.')
        .notEmpty()
        .custom((data) => (0, helpers_1.isProvince)({ data, validRegion: contants_json_1.default }))
        .withMessage("El valor del campo {province} es no es valido."),
    middlewares_1.validateField
];
// Validación de Params de la Request: [getVotersForTownInProvince]
exports.townAndProvinceParamValidationChain = [
    (0, express_validator_1.param)('town', 'El campo {province} es requerido.')
        .notEmpty()
        .custom((data) => (0, helpers_1.isTown)({ data, validRegion: contants_json_1.default }))
        .withMessage('El valor del campo {town} no es valido.'),
    ...exports.provinceParamValidationChain
];
// Validación de los campos del diputado:
exports.deputyCreateValidationChain = [
    (0, express_validator_1.body)('position', 'El campo es requerido.')
        .notEmpty()
        .isString(),
    (0, express_validator_1.body)('biography')
        .notEmpty()
        .isString()
        .isLength({ max: 300 }),
    ...basicInformationValidationChain, // nombre y edad
    ...auxiliaryValidationChain, // provincia y municipio
    middlewares_1.validateField
];
// Validación de los campos de la Request: [updateVoter]
exports.deputyUpdateValidationChain = [
    ...exports.idParamValidationChain,
    ...exports.deputyCreateValidationChain
];
// Validación de los campos de la Request: [createVoter]
exports.votersCreateValidationChain = [
    (0, express_validator_1.body)('ci', 'El campo es requerido')
        .isString()
        .matches(/^[0-9\s]+$/)
        .isLength({ min: 11, max: 11 })
        .withMessage('El valor no es un número de CI valido.'),
    ...basicInformationValidationChain, // nombre y edad
    ...auxiliaryValidationChain, // provincia y municipio
    middlewares_1.validateField,
];
// Validación de los campos de la Request: [updateVoter]
exports.votersUpdateValidationChain = [
    (0, express_validator_1.body)('isValidVoter', 'El campo es requerido.')
        .notEmpty()
        .isBoolean()
        .withMessage('El campo no cumple con el tipo requerido.'),
    ...exports.idParamValidationChain,
    ...exports.votersCreateValidationChain,
];
// Validación de los campos de la Request: [loginVoter]
exports.votersLoginValidationChain = [
    exports.votersCreateValidationChain[0],
    basicInformationValidationChain[0],
    middlewares_1.validateField
];
// Validación de los campos de la Request: [loginAdmin]
exports.adminLoginValidationChain = [
    (0, express_validator_1.body)('name', 'El campo es requerido.')
        .notEmpty()
        .isString(),
    (0, express_validator_1.body)('password', 'El campo es requerido.')
        .notEmpty(),
    middlewares_1.validateField
];
// Validación de los campos de la Request: [UpdateAdmin]
exports.adminUpdateValidationChain = [
    (0, express_validator_1.body)('id').notEmpty().isMongoId(),
    ...exports.adminLoginValidationChain,
    middlewares_1.validarJWT,
    middlewares_1.validateRole
];
// Validación de los campos de la Request: [SetVotes]
exports.setVotesValidationChain = [
    (0, express_validator_1.body)(['voterId', 'deputyId'], 'El campo es requerido.')
        .notEmpty()
        .isMongoId()
        .withMessage('El valor no es un id valido de Mongo'),
    middlewares_1.validateField,
    middlewares_1.validarJWT
];
// Validación de los campos de la Request: [SetVotesData]
exports.seVotesDataValidationChain = [
    (0, express_validator_1.body)(['elecciones', 'finalDate'], 'El campo es requerido.')
        .notEmpty()
        .isString(),
    middlewares_1.validateField,
    middlewares_1.validarJWT,
    middlewares_1.validateRole,
];
