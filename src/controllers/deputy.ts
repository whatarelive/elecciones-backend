import { Request, Response } from 'express'

export const getDeputies = async (_req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'Diputados',
  })
}

export const getDeputiesForProvince = (req: Request, res: Response) => {
  const { province } = req.params

  res.json({
    ok: true,
    message: `Diputados de ${province}`,
  })
}

export const createDeputy = (req: Request, res: Response) => {
  res.status(201).json({
    ok: true,
    diputado: req.body,
    message: 'Diputado creado',
  })
}

export const updateDeputy = async (req: Request, res: Response) => {
  const { id } = req.params

  res.status(203).json({
    ok: true,
    datos: req.body,
    message: `Diputado ${id} actualizado`,
  })
}

export const deleteDeputy = async (req: Request, res: Response) => {
  const { id } = req.params

  res.json({
    ok: true,
    message: `Diputado ${id} eliminado`,
  })
}
