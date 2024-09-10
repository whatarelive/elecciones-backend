import { Router } from 'express'
import { setVotes } from '../controllers/votes'
import { setVotesValidationChain } from "../validations/validationChains";

// Creación del router del recurso [Votación].
export const votesRouter = Router()

// Ruta para recibir los votos.
votesRouter.post('/', setVotesValidationChain, setVotes);
