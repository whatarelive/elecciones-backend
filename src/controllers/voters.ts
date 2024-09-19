import { Request, Response } from 'express'
import { ResourceError } from '../errors/CustomErrors'
import { handlerError } from '../helpers'
import { Voter } from '../interfaces/interfaces'
import VoterModel from '../model/VoterModel'
import validRegion from '../constants/contants.json'

export const getVotersForTownInProvince = async (req: Request, res: Response) => {
  const { province, town } = req.params
  
  try {
    const pro = validRegion.filter(v => v.province.replace(/\s/g, '').toLowerCase() === province).pop()
    
    const votersInProvince = await VoterModel.find({province: pro?.province})    
    
    if (!votersInProvince) 
      throw new ResourceError(404, `No se encontraron votantes de la provincia: ${province}`)
    
    const voters = votersInProvince.filter((v) => v.town.trim().toLowerCase() === town)
    
    if (!voters) throw new ResourceError(404, `No se encontraron votantes del pueblo: ${town}`)    

    res.json({
      ok: true,
      voters,
    })
    
  } catch (error) {
    return handlerError({res, error}) 
  }
}

export const createVoter = async (req: Request, res: Response) => {
  const { name, age, ci, province, town, } = req.body

  try {
    let voter = await VoterModel.findOne({ci})

    if (voter) throw new ResourceError(400,'El votante ya existe en el sistema.')

    const newVoter = new VoterModel({
      name, age, ci, province, town,
      isValidVoter: true 
    })

    voter = await newVoter.save()

    res.status(201).json({
      ok: true,
      voter
    })
    
  } catch (error) {
    return handlerError({res, error})
  }
}

export const updateVoter = async (req: Request, res: Response) => {
  const voterId = req.params.id
  
  try {
    let voter = await VoterModel.findById( voterId )
    
    if (!voter) throw new ResourceError(404, `No se encontro al votante con el id: ${voterId}`)
      
    const { name, age, ci, province, town, isValidVoter } = req.body
      
    const newVoter: Voter = {
      name, age, ci, 
      province, town,
      isValidVoter
    }

    voter = await VoterModel.findByIdAndUpdate(voterId, newVoter, { new: true })

    res.status(200).json({
      ok: true,
      voter,
    })

  } catch (error) {
    return handlerError({res, error})
  }
}

export const deleteVoter = async (req: Request, res: Response) => {
  const voterId = req.params.id

  try {
    let voter = await VoterModel.findById( voterId )
    
    if (!voter) throw new ResourceError(404, `No se encontro al votante con el id: ${voterId}`)

    await VoterModel.findByIdAndDelete( voterId )
    
    res.json({
      ok: true,
      message: `Votante eliminado con el id: ${voterId}`,
    })

  } catch (error) {
    return handlerError({res, error})
  }
}
