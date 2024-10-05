import { Request, Response } from 'express'
import { handlerError } from '../helpers'
import { DeputyModel, VoterModel, EleccionesModel } from '../model'
import { AuthError, ResourceError } from '../errors/CustomErrors'
import { Elecciones } from '../interfaces/interfaces'

// Controlador para manejar las votaciones de los usuarios.
export const setVotes = async (req: Request, res: Response) => {
  // Extraemos los ids del body de la requet
  const { voterId, deputyId } = req.body

  try {
    // Buscamos al votante y al diputado en la base de datos por su ids repectivos.
    let voter = await VoterModel.findById(voterId)
    const deputy = await DeputyModel.findById(deputyId)

    // Si el diputado o el votante no existen, lanzamos un error de Resource.
    if ( !deputy || !voter ) throw new ResourceError(404, 'No se encontro el recurso solicitado.')
      
    // Si el votante no es valido para ejercer el voto se envia un error de Auth.
    if ( !voter.isValidVoter ) throw new AuthError(400, 'El votante no es valido.')
      
    // Mutamos la propiedad isValidVoter del votante.
    voter.isValidVoter = false
    // Mutamos e incrementamos en 1 la propiedad votes del diputado.
    deputy.votes = (deputy.votes! + 1)
    
    // Actualización de ambos documentos en la base de datos.
    voter = await VoterModel.findByIdAndUpdate(voterId, voter, { new: true })
    await DeputyModel.findByIdAndUpdate(deputyId, deputy, { new: true })

    res.json({
      ok: true,
      msg: 'Voto realizado con exito',
      isValidVoter: voter?.isValidVoter,
    })

  } catch (error) {
    // Manejo especial del error.
    return handlerError({ res, error }) 
  }
}

// Controlador para manejar la creación de unas nuevas votaciones.
export const setVotesData = async (req: Request, res: Response) => {
  // Extraemos los datos necesarios del body de la request.
  const { elecciones, finalDate } = req.body

  try { 
    // Buscamos la data en la bse de datos segun la propiedad {elecciones}.
    let votacion = await EleccionesModel.findOne({ elecciones })

    // Si data de la votacion existe, lanzamos un error de Resource.
    if (votacion) throw new ResourceError(400, 'El recurso ya existe en la base de datos.')
 
    // Creamos un nuevo registro de las elecciones.
    const newEleciones = new EleccionesModel<Elecciones>({
      elecciones,
      finalDate,
    });

    // Se guarda el registro en la base de datos
    votacion = await newEleciones.save()
    
    res.status(201).json({
      ok: true,
      votacion
    })
    
  } catch (error) {
    // Manejo especial del error.
    return handlerError({ res, error })
  }
}

// Controlador para manejar la peticion de la data sobre la votación. 
export const getVotesData = async (req: Request, res: Response) => {
  // Extraemos el parametro de busqueda de los params de la request.
  const elecciones = req.params.elecciones

  try {
    // Buscamos la data en la base de datos usando el parametro de busqueda.
    const data = await EleccionesModel.findOne({ elecciones })
    
    // Si no existe esa data, lanzamos un error de Resource.
    if (!data) throw new ResourceError(404, 'No existe informacion para esas elecciones.')
    
    // Hacemos el conteo general de los diputados.
    const cantDeputies = await DeputyModel.countDocuments()
    // Hacemos el conteo general del total de votos actuales.
    const cantVotes = await DeputyModel.aggregate([
      {
        $group: {
          _id: null,
          totalVotes: { $sum: '$votes' } 
        }
      }
    ])

    // La operación anterior da como resultado un arreglo con un objeto con la operacion de suma, que tiene la propiedades {_id, totalVotes}
    const totalVotes = cantVotes.pop().totalVotes 

    res.json({
      ok: true,
      data: {
        elecciones: data.elecciones,
        finalDate: data.finalDate,        
        cantVotes: totalVotes,
        cantDeputies
      }
    })

  } catch (error) {
    // Manejo especial del error. 
    return handlerError({ res, error })
  }
}
