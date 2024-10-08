import { Router } from 'express'
import { validarJWT } from '../middlewares/validate-jwt'
import * as controller from '../controllers/auth'
import * as validate from '../validations/validationChains'

// Creación del router del recurso [Autentificación].
export const authRouter = Router()

// Ruta para que un votante inicie sesion.
authRouter.post('/loginVoter', validate.votersLoginValidationChain, controller.loginVoter)

// Ruta para crear un nuevo [Votante].
authRouter.post('/registerVoter', validate.votersCreateValidationChain, controller.registerVoter)

// Ruta para que un admin inicie sesion.
authRouter.post('/loginAdmin', validate.adminLoginValidationChain, controller.loginAdmin)

// Ruta para revalidar JSON Web Token.
authRouter.post('/renew', [validarJWT], controller.revalidateJWT)
