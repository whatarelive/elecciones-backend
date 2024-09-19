import { Request, Response } from 'express'
import { handlerError } from '../helpers'
import { ResourceError } from '../errors/CustomErrors'
import { Deputy } from '../interfaces/interfaces'
import DeputyModel from '../model/DeputyModel'

export const getDeputies = async (_req: Request, res: Response) => {
  const deputies = await DeputyModel.find()

  res.json({
    ok: true,
    deputies
  })
}

export const getDeputiesForProvince = async (req: Request, res: Response) => {
  const { province } = req.params

  const deputies = DeputyModel.find({province})

  res.json({
    ok: true,
    deputies
  })
}

export const createDeputy = async (req: Request, res: Response) => {
  const { name, age, image, position, province, town, biography } = req.body

  try {    
    let deputy = await DeputyModel.findOne({name})

    if(deputy?.province === province && deputy?.town === town) 
      throw new ResourceError(400, 'El diputado ya existe en el sistema.')
 
    const newDeputy = new DeputyModel({
      name, age, image, position, province, 
      town, biography, votes: 0
    })

    deputy = await newDeputy.save()

    res.status(201).json({
      ok: true,
      deputy,
    })

  } catch (error) {
    return handlerError({res, error})
  }
}

export const updateDeputy = async (req: Request, res: Response) => {
  const deputyId = req.params.id

  try {
    let deputy = await DeputyModel.findById(deputyId)
    
    if (!deputy) throw new ResourceError(404, `No se encontro el diputado con el id: ${deputyId}`)
    
    const { name, age, image, position, province, town, biography, votes } = req.body

    const newDeputy: Deputy = {
      name, age, position, province,
      town, biography, image, votes
    }

    deputy = await DeputyModel.findByIdAndUpdate(deputyId, newDeputy, { new: true })

    res.status(203).json({
      ok: true,
      deputy,
    })

  } catch (error) {
    return handlerError({res, error})    
  }
}

export const deleteDeputy = async (req: Request, res: Response) => {
  const deputyId = req.params.id

  try {
    let deputy = await DeputyModel.findById(deputyId)
    if (!deputy) throw new ResourceError(404, `No se encontro al diputado con el id ${deputyId}`)

    await DeputyModel.findByIdAndDelete(deputyId)
  
    res.json({
      ok: true,
      message: `Diputado ${deputyId} eliminado`,
    })

  } catch (error) {
    return handlerError({res, error})
  }
}
