import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import { createJwt, handlerError } from '../helpers'
import Admin from '../model/Admin'
import AuthError from '../errors/CustomErrors'

export const loginVoter = async (req: Request, res: Response) => {
  const { name, ci } = req.body
  res.status(200).json({
    ok: true,
    voter: { name, ci },
    message: 'Has iniciado sesion',
  })
}

// Controlador para verificar el inicio de Sesion del Admin.
export const loginAdmin = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del cuerpo de la request.
  const { name, password } = req.body

  try {
    // Buscamos el admin con el name proporcionado.
    const admin = await Admin.findOne({name})

    // Si el admin no existe lanzamos un error de Auth.
    if (!admin) throw new AuthError(400, `El admin con el nombre: ${name} no existe.`)

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
    handlerError({ res, error })
  }
}

// Controlador para actualizar la informacion del Admin.
export const updateAdmin = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del cuerpo de la request.
  const uid = req.params.uid

  try {
    // Buscamos el admin con el name proporcionado.
    let admin = await Admin.findById({uid})

    // Si el admin no existe lanzamos un error de Auth.
    if (!admin) throw new AuthError(400, `El no puede modificar un admin que no existe.`)

    // Desestructuramos el body.
    const { name, password } = req.body
    // Creamos el nuevo objeto admin.
    const newAdmin = { name, password } 

    // Buscamos y actualizamos el admin en la BD.
    admin = await Admin.findByIdAndUpdate(uid, newAdmin, {new: true})

    // Despues de comprobar todos los datos, creamos el token para el nuevo admin. 
    const token = await createJwt({ name, uid: admin!._id, role: 'Admin' })

    return res.json({
      ok: true,
      admin,
      token
    })

  } catch (error) {
    // Manejo especial del error.
    handlerError({res, error})
  }
}

export const revalidateJWT = async (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    message: 'Revalidate JWT',
  })
}
