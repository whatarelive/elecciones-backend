import { Router } from 'express'
import { setVotes } from '../controllers/votes'

// Creación del router del recurso [Votación].
export const votesRouter = Router()

// Ruta para recibir los votos.
votesRouter.post('/', setVotes);
