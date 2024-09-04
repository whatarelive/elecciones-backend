import { body, param } from 'express-validator'
import { isProvince, isTown } from '../helpers'
import { validateField } from '../middlewares/validate-field'
import validRegion from '../constants/contants.json'

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

const basicInformationValidationChain = [
  body('name').notEmpty()
    .isString()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('El valor del campo {name} no puede tener caracteres especiales ni números.'),
]

export const deputyValidationChain = [
  body('age', 'El campo es requerido.')
    .notEmpty()
    .isInt({ min: 18, max: 95 }),
  body(['image', 'position'], 'El campo es requerido.')
    .notEmpty()
    .isString(),
  body('biography')
    .notEmpty()
    .isString()
    .isLength({ max: 300 }),
  ...basicInformationValidationChain,
  ...auxiliaryValidationChain,
  validateField
]

export const votersValidationChain = [
  ...basicInformationValidationChain,
  ...auxiliaryValidationChain,
  validateField
]

export const adminValidationChain = []

export const idParamValidationChain = [
  param('id', 'El campo {id} es requerido.')
    .notEmpty()
    .isMongoId(),
  validateField
]

export const provinceParamValidationChain = [
  param('province', 'El campo {province} es requerido.')
    .notEmpty()
    .custom((data) => isProvince({data, validRegion}))
    .withMessage("El valor del campo {province} es no es valido."),
  validateField
]
