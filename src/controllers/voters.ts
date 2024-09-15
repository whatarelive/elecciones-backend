import { Request, Response } from 'express'
import { Voter } from '../interfaces/interfaces'
import VoterModel from '../model/VoterModel'
import { ResourceError } from '../errors/CustomErrors'

export const getVotersForTownInProvince = async (req: Request, res: Response) => {
  const { province,town } = req.params

  res.status(200).json({
    ok: true,
    message: `Votantes de la ${province} en el municipio: ${town}`,
  })
}

export const createVoter = async (req: Request, res: Response) => {
  const { name, age, ci, province, town, } = req.body

  try {
    let voter = await VoterModel.findOne({ci})
    
    if (voter) throw new ResourceError('')

    const newVoter: Voter = {
      name, age, ci, province, town,
      isValidVoter: true 
    }

    console.log(newVoter)

    
  } catch (error) {
    
  }

  res.status(200).json({
    ok: true,
    voter: req.body,
    message: 'Votante creado',
  })
}

export const updateVoter = async (req: Request, res: Response) => {
  const { id } = req.params
  res.status(200).json({
    ok: true,
    message: `Votante con el id: ${id} actualizado`,
  })
}

export const deleteVoter = async (req: Request, res: Response) => {
  const { id } = req.params
  res.status(200).json({
    ok: true,
    message: `Votante eliminado con el id: ${id}`,
  })
}
