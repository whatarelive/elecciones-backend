import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import { AdminModel, VoterModel } from '../model'
import { createJwt, handlerError, isRole } from '../helpers'
import { AuthError, ResourceError } from '../errors/CustomErrors'
import { Voter } from '../interfaces/interfaces'

// Controlador para agregar un nuevo Votante.
export const registerVoter = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del cuerpo de la request.
  const { name, age, ci, province, town, } = req.body

  try {
    // Buscamos el votante con el # de carnet proporcionado.
    let voter = await VoterModel.findOne({ci})

    // Si el votante ya existe en la Base de datos, lanzamos un error de Resource. 
    if (voter) throw new ResourceError(400,'El votante ya existe en el sistema.')

    // Creamos la imagen por defecto al votante.
    const { image_path, image_publicId } = {
      image_path: process.env.DEFAULT_IMAGE_URL!,
      image_publicId: process.env.DEFAULT_IMAGE_PUBLIC_ID!,
    }

    // Creacion del nuevo votante.
    const newVoter = new VoterModel<Voter>({
      name, age, ci, 
      image_path, image_publicId,
      province, town,
      isValidVoter: true 
    })

    // Se realiza el guardado en la Base de datos.
    voter = await newVoter.save()

    // Despues de guardar el votante, creamos el token para el votante con el rol de Usuario. 
    const token = await createJwt({ uid: voter._id, name, role: 'User'})

    res.status(201).json({
      ok: true,
      voter,
      token
    })
    
  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}

// Controlador para verificar el inicio de Sesion de los Votantes.
export const loginVoter = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del cuerpo de la request.
  const { name, ci } = req.body
  
  try {
    // Buscamos el voter con el name proporcionado.
    const voter = await VoterModel.findOne({name})

    // Si el votante no existe en la Base de Datos, lanzamos un error de Resource.
    if (!voter) throw new ResourceError(404, `El votante con el nombre: ${name} no existe.`)

    // Si los valores de CI no son iguales lanzamos un error de Auth.
    if (ci.trim() !== voter.ci) throw new AuthError(400, `El numero de carnet: ${ci} no es valido.`)
     
    // Despues de comprobar todos los datos, creamos el token para el votante con el rol de Usuario. 
    const token = await createJwt({uid: voter._id, name, role: 'User'})

    return res.json({
      ok: true,
      voter,
      token
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}

// Controlador para verificar el inicio de Sesion del Admin.
export const loginAdmin = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del cuerpo de la request.
  const { name, password } = req.body

  try {
    // Buscamos el admin con el name proporcionado.
    const admin = await AdminModel.findOne({name})

    // Si el admin no existe lanzamos un error de Auth.
    if (!admin) throw new ResourceError(404, `El admin con el nombre: ${name} no existe.`)

    // Comprobamos que ambas contraseñas sean iguales despues de desencriptar la almacenada en la BD.
    const validPassword = bcryptjs.compareSync( password, admin.password )
    
    // Si la constraseñas no son iguales lanzamos un error de Auth.
    if (!validPassword) throw new AuthError(400, 'La contraseña es incorrecta.')
    
    // Despues de comprobar todos los datos, creamos el token para el admin, con el rol de Administrador. 
    const token = await createJwt({ name, uid: admin._id, role: 'Admin' })

    return res.json({
      ok: true,
      token
    })

  } catch (error) {
    // Manejo especial del error
    return handlerError({ res, error })
  }
}

// Controlador para regenerar un nuevo Token. 
export const revalidateJWT = async (req: Request, res: Response) => {
  // Recuperamos los datos del token anterior establecidos en los headers de la request.
  const uid = req.header('uid')
  const name = req.header('name')
  const role = req.header('role')

  try {  
    // Comprobación estricta del type de la propiedad role.
    if (!isRole(role)) throw new AuthError(401, 'Role invalido.')
    // Comprobación de que se establecio el nombre de usuario que solicita el token. 
    if (!name) throw new AuthError(401, 'No se puede crear el token para un usuario desconocido')

    // Creacion del nuevo token.
    const newToken = await createJwt({ uid, name, role })
      
    res.json({
      ok: true,
      token: newToken
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}  