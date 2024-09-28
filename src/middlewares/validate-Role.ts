import { Request, Response, NextFunction } from 'express'
import { handlerError } from '../helpers'
import { AuthError } from '../errors/CustomErrors'

// Fución para comprobar el nivel de seguridad del usuario usando la propiedad { Role }.
export const validateRole = (req: Request, res: Response, next: NextFunction) => {
    try {
    // Recuperamos el rol del user o admin extraido del token en los headers.
    const role = req.header('role')

    // Comprobamos que tengan la autorizacion requerida el token.
    if (role !== 'Admin') throw new AuthError(401, 'Autorizacion erronea.')
    
    } catch (error) {
        // Manejo especial del error.
        return handlerError({res, error})
    }

    next()
}