import { Router } from 'express'
import { validarJWT, validateRole } from '../middlewares'
import { upload } from '../constants/multer'
import * as controller from '../controllers/users'
import * as validate from '../validations/validationChains'

// Creación del router del recurso [Votante].
export const usersRouter = Router()

// Middleware para las rustas siguientes.
usersRouter.use([ validarJWT ])

// Ruta para actualizar los datos de un [Votante] por su {id}.
usersRouter.put('/:id', upload.single('image'), validate.votersUpdateValidationChain, controller.updateVoter)

// Ruta para eliminar un [Votante] por su {id}.
usersRouter.delete('/:id', validate.idParamValidationChain, controller.deleteVoter)

// Middleware para las rustas siguientes.
usersRouter.use([ validateRole ])

// Ruta para editar la información del admin.
usersRouter.put('/updateAdmin', validate.adminUpdateValidationChain, controller.updateAdmin)

// Ruta para devolver todos los [Votantes] de un {Municipio} de la {Provincia}.
usersRouter.get('/:province/:town', validate.townAndProvinceParamValidationChain, controller.getVotersForTownInProvince)
