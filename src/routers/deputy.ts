import { Router } from 'express'
import * as controller from '../controllers/deputy'
import * as validate from '../validations/validationChains'

// Creación del router del recurso [Diputado].
export const deputiesRouter = Router()

// Ruta para devolver todos los [Diputado].
deputiesRouter.get('/', controller.getDeputies)

// Ruta para devolver todos los [Diputado] de una {provincia}.
deputiesRouter.get('/:province', validate.provinceParamValidationChain, controller.getDeputiesForProvince)

// Ruta para crear un nuevo [Diputado].
deputiesRouter.post('/', validate.deputyValidationChain, controller.createDeputy)

// Ruta para actualizar un [Diputado] por su {id}.
deputiesRouter.put('/:id', validate.idParamValidationChain, controller.updateDeputy)

// Ruta para eliminar un [Diputado] por su {id}.
deputiesRouter.delete('/:id', validate.idParamValidationChain, controller.deleteDeputy)
