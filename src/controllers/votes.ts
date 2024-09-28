import { Request, Response } from 'express'

export const setVotes = async (req: Request, res: Response) => {
  const {} = req.body

  res.status(201).json({
    ok: true,
    message: 'Voto realizado con exito'
  })
}

export const getVotesData = async (_req: Request, res: Response) => {
  res.json({
    ok: true,
    data: {}
  })
}

