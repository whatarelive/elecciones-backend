import { Router } from 'express'

export const diputadosRouter = Router()

diputadosRouter.get('/', (_req, res) => {
  res.json({
    ok: true,
    message: 'Diputados'
  })
})

diputadosRouter.get('/:provincia', (req, res) => {
  const { provincia } = req.params

  res.json({
    ok: true,
    message: `Diputados de ${provincia}`
  })
})

diputadosRouter.post('/', (req, res) => {
  res.status(201).json({
    ok: true,
    diputado: req.body,
    message: 'Diputado creado'
  })
})

diputadosRouter.patch('/:id', (req, res) => {
  const { id } = req.params

  res.status(203).json({
    ok: true,
    datos: req.body,
    message: `Diputado ${id} actualizado`
  })
})

diputadosRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json({
    ok: true,
    message: `Diputado ${id} eliminado`
  })
})
