import { Response, Request, NextFunction } from 'express'
import { validationResult } from 'express-validator'

// Funcion para comprobar si no se encontraron errores en las validaciones de las peticiones.
export const validateField = (req: Request, res: Response, next: NextFunction) => {
  // Se recuperan los resultados de las validaciones de la request.
  const errors = validationResult(req)

  // Si existen errores se le envia una respuesta al cliente.
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      // Se envia los errores en forma de arreglo de objetos
      errors: errors.array() 
    })
  }

  next()
}

