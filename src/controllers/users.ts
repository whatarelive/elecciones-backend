import bcryptjs from 'bcryptjs'
import { Request, Response } from 'express'
import { VoterModel, AdminModel } from '../model'
import { createJwt, handlerError, updateImage, deleteImage } from '../helpers'
import { ResourceError } from '../errors/CustomErrors'
import { Admin, Voter } from '../interfaces/interfaces'
import validRegion from '../constants/contants.json'

// Controlador para recuperar los votantes por provincias y municipios.
export const getVotersForTownInProvince = async (req: Request, res: Response) => {
  // Extraemos los parametros de busquedad de los param de la request.
  const { province, town } = req.params
  
  try {
    // Recuperamos la region{provincia + municipios} (escrita correctamente) de las constantes.
    const region = validRegion.filter(v => v.province.replace(/\s/g, '').toLowerCase() === province).pop()
    
    // Extraemos el municipio (escrita correctamente).
    const searchTown = region?.towns.filter(v => v.replace(/\s/g, '').toLocaleLowerCase() === town ).pop()

    // Buscamos los votantes segun la provincia y el municipio. 
    const voters = await VoterModel.find({province: region?.province, town: searchTown})    
    
    // Si no hay votantes, lanzamos un error de Resource.
    if (!voters) throw new ResourceError(404, `No se encontraron votantes del municipio ${searchTown} de la provincia: ${region?.province}`)
    
    res.json({
      ok: true,
      voters,
    })
    
  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error}) 
  }
}

// Controlador para editar la información de un votante. 
export const updateVoter = async (req: Request, res: Response) => {
  // Recuperamos el id del diputado de los params de la request.
  const voterId = req.params.id
  
  try {
    // Buscamos el votante por su id en la base de datos. 
    let voter = await VoterModel.findById(voterId)
    
    // Si el votante no existe, lanzamos un error de Resource
    if (!voter) throw new ResourceError(404, `No se encontro al votante con el id: ${voterId}`)
      
    // Desestructuramos los datos necesarios de la request.body.
    const { name, age, ci, province, town, isValidVoter } = req.body
  
    // Remplazamos la imagen en Cloudinary.
    const { image_path, image_publicId } = await updateImage({ image: req.file, model: voter })
      
    // Creamos el nuevo objeto del votante.
    const newVoter: Voter = {
      name, age, ci,
      image_path, image_publicId, 
      province, town,
      isValidVoter
    }

    // Buscamos y actualizmos el votante en la base de datos. 
    voter = await VoterModel.findByIdAndUpdate(voterId, newVoter, { new: true })

    res.status(200).json({
      ok: true,
      voter,
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
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

    // Desestructuramos los datos necesarios de la request.body.
    const { name, password } = req.body
    // Creamos el nuevo objeto admin.
    const newAdmin: Admin = { name, password } 

    // Generación del patron de encriptación.
    const salt = bcryptjs.genSaltSync()
    // Encriptacion de la contraseña.
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

// Controlador para eliminar un votante.
export const deleteVoter = async (req: Request, res: Response) => {
  // Extraemos la id del voter de los parametros de la request.
  const voterId = req.params.id

  try {
    // Buscamos el votante en la base de datos.
    let voter = await VoterModel.findById(voterId)
    
    // Si no existe, lanzamos un error de Resource.
    if (!voter) throw new ResourceError(404, `No se encontro al votante con el id: ${voterId}`)

    // Eliminamosla imagen de Cloudinary 
    await deleteImage({ 
      publicId: voter.image_publicId, 
      imagePath: voter.image_path 
    })
  
    // Buscamos y eliminamos el votante de la base de datos.
    await VoterModel.findByIdAndDelete(voterId)
    
    res.json({
      ok: true,
      message: `Votante eliminado con el id: ${voterId}`,
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}
