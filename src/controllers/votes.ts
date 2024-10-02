import { Request, Response } from 'express'
import { handlerError } from '../helpers'
import { DeputyModel, VoterModel, EleccionesModel } from '../model'
import { AuthError, ResourceError } from '../errors/CustomErrors'
import { Deputy, Elecciones, Voter } from '../interfaces/interfaces'

export const setVotes = async (req: Request, res: Response) => {
  const { voterId, deputyId } = req.body

  try {
    let voter = await VoterModel.findById(voterId)
    const deputy = await DeputyModel.findById(deputyId)

    if ( !voter?.isValidVoter ) throw new AuthError(400, 'El votante no es valido.')
  
    if ( !deputy || !voter ) throw new ResourceError(404, 'No se encontro el recurso solicitado.')
      
    const updateVoter: Voter = { ...voter, isValidVoter: false }
    const updateDeputy: Deputy = { ...deputy, votes: (+deputy.votes! + 1) }
    
    voter = await VoterModel.findByIdAndUpdate(voterId, updateVoter, { new: true })
    await DeputyModel.findByIdAndUpdate(deputyId, updateDeputy, { new: true })

    res.json({
      ok: true,
      isValidVoter: voter?.isValidVoter,
    })

  } catch (error) {
    return handlerError({ res, error }) 
  }
}

export const setVotesData = async (req: Request, res: Response) => {
  const { elecciones, finalDate } = req.body

  try {
    let votacion = await EleccionesModel.findOne({ elecciones })

    if (votacion) throw new ResourceError(400, 'El recurso ya existe en la base de datos.')
    
    const newEleciones = new EleccionesModel<Elecciones>({
      elecciones,
      finalDate,
    });

    votacion = await newEleciones.save()
    
    res.status(201).json({
      ok: true,
      votacion
    })
    
  } catch (error) {
    return handlerError({ res, error })
  }
}

export const getVotesData = async (req: Request, res: Response) => {
  const elecciones = req.params.elecciones

  try {
    const data = await EleccionesModel.findOne({ elecciones })
    
    if (!data) throw new ResourceError(404, 'No existe informacion para esas elecciones.')
    
    const cantDeputies = await DeputyModel.countDocuments()
    const cantVotes = await DeputyModel.aggregate([
      {
        $group: {
          _id: null,
          totalVotes: { $sum: '$votes' } 
        }
      }
    ])

    res.json({
      ok: true,
      data: {
        elecciones: data.elecciones,
        finalDate: data.finalDate,        
        cantDeputies,
        cantVotes
      }
    })

  } catch (error) {
    return handlerError({ res, error })
  }
}
