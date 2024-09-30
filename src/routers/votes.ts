import { Router } from 'express'
import * as controller from '../controllers/votes'
import * as validation from '../validations/validationChains'

// Creación del router del recurso [Votación].
export const votesRouter = Router()

// Ruta para recuperar la data de la votacion.
votesRouter.get('/:elecciones', controller.getVotesData)

// Ruta para establecer la data de la votacion.
votesRouter.post('/newelecciones', validation.seVotesDataValidationChain, controller.setVotesData)

// Ruta para recibir los votos.
votesRouter.post('/', validation.setVotesValidationChain, controller.setVotes)