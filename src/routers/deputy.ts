import { Router } from 'express'
import { validarJWT, validateRole } from '../middlewares'
import { upload } from '../constants/multer'
import * as controller from '../controllers/deputy'
import * as validate from '../validations/validationChains'

// Creación del router del recurso [Diputado].
export const deputiesRouter = Router()

// Ruta para devolver todos los [Diputado].
deputiesRouter.get('/', controller.getDeputies)

// Ruta para devolver todos los [Diputado] de una {provincia}.
deputiesRouter.get('/:province', validate.provinceParamValidationChain, controller.getDeputiesForProvince)

deputiesRouter.use([validarJWT, validateRole])

// Ruta para crear un nuevo [Diputado].
deputiesRouter.post('/', upload.single('image'), validate.deputyCreateValidationChain, controller.createDeputy)

// Ruta para actualizar un [Diputado] por su {id}.
deputiesRouter.put('/:id', upload.single('image'), validate.deputyUpdateValidationChain, controller.updateDeputy)

// Ruta para eliminar un [Diputado] por su {id}.
deputiesRouter.delete('/:id', validate.idParamValidationChain, controller.deleteDeputy)
