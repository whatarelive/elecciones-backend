import { Request, Response } from 'express'
import { DeputyModel } from '../model'
import { handlerError, handlerPaginate, uploadImage, updateImage, deleteImage } from '../helpers'
import { ResourceError } from '../errors/CustomErrors'
import { Deputy } from '../interfaces/interfaces'

// Controlador para recuperar todos los diputados.
export const getDeputies = async (req: Request, res: Response) => {
    // Extraemos los querys de paginación de los elementos.
    const { page, limit } = req.query

  try {
    // Se realiza el calculo de las propiedades de paginación.
    const { skip, limitNumber } = handlerPaginate({page, limit})

    // Se extraen todos los diputados de la base de datos.
    const deputies = await DeputyModel.find().skip(skip).limit(limitNumber)
    // Calculamos la cantidad de diputados en la Base de Datos. 
    const totalDeputies = await DeputyModel.countDocuments()

    res.json({
      ok: true,
      deputies,
      totalElements: totalDeputies
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}

// Controlador para recuperar los diputados por provincia.
export const getDeputiesForProvince = async (req: Request, res: Response) => {
  // Extraemos el parametro de busqueda de la request.
  const { province } = req.params
  // Extraemos los querys de paginación de los elementos.
  const { page, limit } = req.query
  
  try {
    // Se realiza el calculo de las propiedades de paginación.
    const { skip, limitNumber } = handlerPaginate({page, limit})

    // Extraemos los diputados desde la base de datos filtrando por provincia.
    const deputies = await DeputyModel.find({province}).skip(skip).limit(limitNumber)
    // Calculamos la cantidad de diputados en la Base de Datos. 
    const totalDeputies = await DeputyModel.countDocuments({province})

    res.json({
      ok: true,
      deputies,
      totalElement: totalDeputies
    })
    
  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}

// Controlador para crear un nuevo diputado.
export const createDeputy = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del cuerpo de la request.
  const { name, age, position, province, town, biography } = req.body
 
  try {
    // Buscamos al diputado en la base de datos por el nombre. 
    let deputy = await DeputyModel.findOne({name})

    // Si el diputado ya esxiste en la base de datos, lanzamos un error de Resource.
    if(deputy) throw new ResourceError(400, 'El diputado ya existe en el sistema.')

    // Subimos la imagen a Cloudinary.
    const { image_path, image_publicId } = await uploadImage({ image: req.file })
   
    // Creamos el nuevo objeto diputado.
    const newDeputy = new DeputyModel<Deputy>({
      name, age, 
      image_path, image_publicId, 
      position, province, town, 
      biography, votes: 0
    })

    // Guardamos el diputado en la Base de Datos.
    deputy = await newDeputy.save()

    res.status(201).json({
      ok: true,
      deputy,
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}

// Controlador para editar la información de un diputado.
export const updateDeputy = async (req: Request, res: Response) => {
  // Recuperamos el id del diputado de los params de la request.
  const deputyId = req.params.id

  try {
    // Buscamos al diputado con ese id en la base de datos.
    let deputy = await DeputyModel.findById(deputyId)
    
    // Si no existe el diputado, lanzamos un error de Resource.
    if (!deputy) throw new ResourceError(404, `No se encontro el diputado con el id: ${deputyId}`)
    
    // Extraemos los datos necesarios del cuerpo de la request.
    const { name, age, position, province, town, biography, votes } = req.body

    // Remplazamos la imagen en Cloudinary.
    const { image_path, image_publicId } = await updateImage({ image: req.file, model: deputy })

    // Creamos el nuevo objeto diputado.
    const newDeputy: Deputy = {
      name, age,
      image_path, 
      image_publicId, 
      position, province, town, 
      biography, votes
    }

    // Buscamos y actualizamos el diputado en la base de datos.
    deputy = await DeputyModel.findByIdAndUpdate(deputyId, newDeputy, { new: true })

    res.json({
      ok: true,
      deputy,
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})    
  }
}

// Controlador para eliminar un diputado a través del id.
export const deleteDeputy = async (req: Request, res: Response) => {
  // Recuperamos el id del diputado de los params de la request.
  const deputyId = req.params.id

  try {
    // Buscamos al diputado con ese id en la base de datos.
    let deputy = await DeputyModel.findById(deputyId)

    // Si no existe el diputado, lanzamos un error de Resource.
    if (!deputy) throw new ResourceError(404, `No se encontro al diputado con el id ${deputyId}`)

    // Eliminar la imagen de Cloudinary. 
    await deleteImage({ 
      publicId: deputy.image_publicId, 
      imagePath: deputy.image_path 
    })

    // Buscamos y eliminamos el diputado de la base de datos.
    await DeputyModel.findByIdAndDelete(deputyId)
  
    res.json({
      ok: true,
      message: `Diputado ${deputyId} eliminado`,
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({res, error})
  }
}
