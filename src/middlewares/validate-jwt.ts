import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { JWTPayload } from '../interfaces/interfaces'
import { AuthError } from '../errors/CustomErrors'

// Middleware para validar el token que se recibe en la petición.
export const validarJWT = ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
    // Se recupera el token de los headers de la petición. 
    const token = req.header('x-token')

    try {
        // Si no viene el token, lanzamos un error de Auth.
        if (!token) throw new AuthError(400, 'No hay un token en la petición.')

        // Verificamos el token usando la palabra secreta y extraemos la data del payload.
        const data = jsonwebtoken.verify(token, process.env.SECRET_JWT_SEED!) 
        const { uid, name, role } = data as JWTPayload

        // Establecemos las propiedades siguientes en los headers de la petición.
        // De forma que se puedan recuperar más adelante de ser necesario. 
        req.headers['uid'] = uid
        req.headers['name'] = name
        req.headers['role'] = role

    } catch (error) {
        // Si el error no es una instancia de AuthError se establece un mensaje y statusCode por defecto. 
        const msgError = error instanceof AuthError ? error.message : 'Token invalido.'
        const status = error instanceof AuthError ? error.status : 401

        return res.status(status).json({
            ok: false,
            msg: msgError,
        })
    }

    next();
}