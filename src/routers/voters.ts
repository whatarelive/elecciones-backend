import { Router } from 'express'
import * as controller from '../controllers/voters'
import * as validate from '../validations/validationChains'

// Creación del router del recurso [Votante].
export const votersRouter = Router()

// Ruta para devolver todos los [Votantes] de un {Municipio} de la {Provincia}.
votersRouter.get('/:province/:town', validate.townAndProvinceParamValidationChain, controller.getVotersForTownInProvince)

// Ruta para crear un nuevo [Votante].
votersRouter.post('/', validate.votersCreateValidationChain, controller.createVoter)

// Ruta para actualizar los datos de un [Votante] por su {id}.
votersRouter.put('/:id', validate.votersUpdateValidationChain, controller.updateVoter)

// Ruta para eliminar un [Votante] por su {id}.
votersRouter.delete('/:id', validate.idParamValidationChain, controller.deleteVoter)
