import { Router } from 'express'
import {
  createDeputy, getDeputies, getDeputiesForProvince,
  updateDeputy, deleteDeputy
} from '../controllers/deputy'
import { validateField } from '../middlewares/validate-field'
import { check } from 'express-validator'

export const deputiesRouter = Router()

deputiesRouter.get('/', getDeputies)

deputiesRouter.get('/:province', getDeputiesForProvince)

deputiesRouter.post(
  '/', 
  [
    check('name', 'El campo es requerido').notEmpty(),
    check('province', 'El campo es requerido').notEmpty(),
    validateField
  ], 
  createDeputy
)

deputiesRouter.put('/:id', updateDeputy)

deputiesRouter.delete('/:id', deleteDeputy)
