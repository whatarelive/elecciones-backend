import { Router } from 'express'
import * as controller from '../controllers/voters'

// Creación del router del recurso [Votante].
export const votersRouter = Router()

// Ruta para devolver todos los [Votantes] de un {Municipio} de la {Provincia}.
votersRouter.get('/:province/:town', controller.getVotersForTownInProvince)

// Ruta para crear un nuevo [Votante].
votersRouter.post('/', controller.createVoter)

// Ruta para actualizar los datos de un [Votante] por su {id}.
votersRouter.put('/:id', controller.updateVoter)

// Ruta para eliminar un [Votante] por su {id}.
votersRouter.delete('/:id', controller.deleteVoter)
