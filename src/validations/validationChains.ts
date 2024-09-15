import { body, param } from 'express-validator'
import { isProvince, isTown } from '../helpers'
import { validateField, validarJWT } from '../middlewares'
import validRegion from '../constants/contants.json'

// Validación de los campos: {province} y {town}.
const auxiliaryValidationChain = [
  body('province', 'El campo {province} es requerido.')
    .notEmpty()
    .custom((data) => isProvince({ data, validRegion }))
    .withMessage('El valor del campo {province} no es valido.'),
  body('town', 'El campo {province} es requerido.')
    .notEmpty()
    .custom((data) => isTown({ data, validRegion }))
    .withMessage('El valor del campo {town} no es valido.'),
]

// Validación de los campos: {name} y {age}.
const basicInformationValidationChain = [
  body('name').notEmpty()
    .isString()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('El valor del campo {name} no puede tener caracteres especiales ni números.'),
  body('age', 'El campo es requerido.')
    .notEmpty()
    .isInt({ min: 18, max: 95 }),
]

// Validación de Params de la Request: [updateDeputy & deleteDeputy]
export const idParamValidationChain = [
  param('id', 'No es un id valido.').notEmpty().isMongoId(),
  validateField
]

// Validación de Params de la Request: [getDeputiesForProvince]
export const provinceParamValidationChain = [
  param('province', 'El campo {province} es requerido.')
    .notEmpty()
    .custom((data) => isProvince({data, validRegion}))
    .withMessage("El valor del campo {province} es no es valido."),
  validateField
]

// Validación de Params de la Request: [getVotersForTownInProvince]
export const townAndProvinceParamValidationChain = [
  param('town', 'El campo {province} es requerido.')
    .notEmpty()
    .custom((data) => isTown({ data, validRegion }))
    .withMessage('El valor del campo {town} no es valido.'),
  ...provinceParamValidationChain
]

// Validación de los campos del diputado:
export const deputyCreateValidationChain = [
  body(['image', 'position'], 'El campo es requerido.')
    .notEmpty()
    .isString(),
  body('biography')
    .notEmpty()
    .isString()
    .isLength({ max: 300 }),
  ...basicInformationValidationChain, // nombre y edad
  ...auxiliaryValidationChain, // provincia y municipio
  validateField
]

// Validación de los campos de la Request: [updateVoter]
export const deputyUpdateValidationChain = [
  ...idParamValidationChain,
  ...deputyCreateValidationChain
]

// Validación de los campos de la Request: [createVoter]
export const votersCreateValidationChain = [
  body('ci', 'El campo es requerido')
    .isString()
    .matches(/^[0-9\s]+$/)
    .isLength({ min: 11, max: 11 })
    .withMessage('El valor no es un número de CI valido.'),
  ...basicInformationValidationChain, // nombre y edad
  ...auxiliaryValidationChain, // provincia y municipio
  validateField,
  validarJWT
]

// Validación de los campos de la Request: [updateVoter]
export const votersUpdateValidationChain = [
  body('isValidVoter', 'El campo es requerido.')
    .notEmpty()
    .isBoolean()
    .withMessage('El campo no cumple con el tipo requerido.'),
  ...idParamValidationChain,
  ...votersCreateValidationChain,
]

// Validación de los campos de la Request: [loginVoter]
export const votersLoginValidationChain = [
  votersCreateValidationChain[0],
  basicInformationValidationChain[0],
  validateField
]

// Validación de los campos de la Request: [loginAdmin]
export const adminLoginValidationChain = [
  body('name', 'El campo es requerido.')
    .notEmpty()
    .isString(),
  body('password', 'El campo es requerido.')
    .notEmpty(),
  validateField
]

// Validación de los campos de la Request: [UpdateAdmin]
export const adminUpdateValidationChain = [
  idParamValidationChain[0],
  ...adminLoginValidationChain,
  validarJWT,
]

// Validación de los campos de la Request: [SetVotes]
export const setVotesValidationChain = [
  body(['voterId', 'deputyId'], 'El campo es requerido.')
    .notEmpty()
    .isMongoId()
    .withMessage('El valor no es un id valido de Mongo'),
  validateField
]