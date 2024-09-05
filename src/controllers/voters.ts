import { Request, Response } from 'express'

export const getVotersForTownInProvince = async (req: Request, res: Response) => {
  const {
    province,
    town
  } = req.params

  res.status(200).json({
    ok: true,
    message: `Votantes de la ${province} en el municipio: ${town}`,
  })
}

export const createVoter = async (req: Request, res: Response) => {
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
