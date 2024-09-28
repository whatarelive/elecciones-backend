import { Router } from 'express'
import * as controller from '../controllers/votes'
import { setVotesValidationChain } from "../validations/validationChains";

// Creación del router del recurso [Votación].
export const votesRouter = Router()

// Ruta para recibir los votos.
votesRouter.post('/', setVotesValidationChain, controller.setVotes);

// Ruta para recuperar la data de la votacion.
votesRouter.get('/', controller.getVotesData)