import { Request, Response, NextFunction } from 'express'
import { AuthError } from '../errors/CustomErrors'
import { handlerError } from '../helpers'

export const validateRole = (req: Request, res: Response, next: NextFunction) => {
    try {
    // Recuperamos el rol del user o admin extraido del token en los headers.
    const role = req.header('role')

    // Comprobamos que tengan la autorizacion requerida el token.
    if (role !== 'Admin') throw new AuthError(401, 'Autorizacion erronea.')
    
    } catch (error) {
        return handlerError({res, error})
    }

    next()
}