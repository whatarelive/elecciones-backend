import { Router } from 'express'
import * as controller from '../controllers/auth'
import * as validate from '../validations/validationChains'

// Creación del router del recurso [Autentificación].
export const authRouter = Router()

// Ruta para que un votante inicie sesion.
authRouter.post('/loginVoter', validate.votersLoginValidationChain, controller.loginVoter)

// Ruta para que un admin inicie sesion.
authRouter.post('/loginAdmin', controller.loginAdmin)

// Ruta para editar la información del admin.
authRouter.patch('/editAdmin', controller.updateAdmin)

// Ruta para revalidar JSON Web Token.
authRouter.post('/renew', controller.revalidateJWT)
