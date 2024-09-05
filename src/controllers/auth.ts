import { Request, Response } from 'express'

export const loginVoter = async (req: Request, res: Response) => {
  const { name, ci } = req.body
  res.status(200).json({
    ok: true,
    voter: { name, ci },
    message: 'Has iniciado sesion',
  })
}

export const loginAdmin = async (req: Request, res: Response) => {
  const { user, password } = req.body

  res.status(200).json({
    ok: true,
    voter: { user, password },
    message: 'Has iniciado sesion',
  })
}

export const updateAdmin = async (req: Request, res: Response) => {
  const { user, password } = req.body

  res.status(200).json({
    ok: true,
    voter: { user, password },
    message: 'Has iniciado sesion',
  })
}

export const revalidateJWT = async (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    message: 'Revalidate JWT',
  })
}
