import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import { createJwt, handlerError, isRole } from '../helpers'
import { AuthError, ResourceError } from '../errors/CustomErrors'
import { Admin } from '../interfaces/interfaces'
import AdminModel from '../model/AdminModel'
import VoterModel from '../model/VoterModel'

// Controlador para verificar el inicio de Sesion de los Votantes.
export const loginVoter = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del cuerpo de la request.
  const { name, ci } = req.body
  
  try {
    // Buscamos el voter con el name proporcionado.
    const voter = await VoterModel.findOne({name})

    // Si el voter no existe lanzamos un error de Resource.
    if (!voter) throw new ResourceError(404, `El votante con el nombre: ${name} no existe.`)

    // Si los valores de CI no son iguales lanzamos un error de Auth.
    if (ci.trim() !== voter.ci) throw new AuthError(400, `El numero de carnet: ${ci} no es valido.`)
     
    // Despues de comprobar todos los datos, creamos el token para el voter. 
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
    
    // Despues de comprobar todos los datos, creamos el token para el admin. 
    const token = await createJwt({ name, uid: admin._id, role: 'Admin' })

    return res.json({
      ok: true,
      admin,
      token
    })

  } catch (error) {
    // Manejo especial del error
    return handlerError({ res, error })
  }
}

// Controlador para actualizar la informacion del Admin.
export const updateAdmin = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del cuerpo de la request.
  const { id } = req.body

  try {
    // Buscamos el admin con el name proporcionado.
    let admin = await AdminModel.findById(id)

    // Si el admin no existe lanzamos un error de Auth.
    if (!admin) throw new ResourceError(404, `El no puede modificar un admin que no existe.`)

    // Desestructuramos el body.
    const { name, password } = req.body
    // Creamos el nuevo objeto admin.
    const newAdmin: Admin = { name, password } 

    // Encriptacion de la contraseña.
    const salt = bcryptjs.genSaltSync()
    newAdmin.password = bcryptjs.hashSync(password, salt)

    // Buscamos y actualizamos el admin en la BD.
    admin = await AdminModel.findByIdAndUpdate(id, newAdmin, {new: true})

    // Despues de comprobar todos los datos, creamos el token para el nuevo admin. 
    const token = await createJwt({ name, uid: admin!._id, role: 'Admin' })

    return res.json({
      ok: true,
      admin,
      token
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}

// Controlador para regenerar un nuevo Token. 
export const revalidateJWT = async (req: Request, res: Response) => {
  const uid = req.header('uid')
  const name = req.header('name')
  const role = req.header('role')

  try {  
    if (!isRole(role)) throw new AuthError(401, 'Role invalido.')
    if (!name) throw new AuthError(401, 'No se puede crear el token para un usuario desconocido')

    const newToken = await createJwt({ uid, name, role })
      
    res.json({
      ok: true,
      token: newToken
    })

  } catch (error) {
    return handlerError({res, error})
  }
}  