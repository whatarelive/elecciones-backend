import { Request, Response } from 'express'

export const setVotes = async (_req: Request, res: Response) => {
  res.status(201).set({
    ok: true,
    message: 'Voto realizado con exito',
  })
}
