import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { JWTPayload } from '../interfaces/interfaces'
import { AuthError } from '../errors/CustomErrors'

export const validarJWT = ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
    const token = req.header('x-token');

    try {
        if (!token) throw new AuthError(400, 'No hay un token en la peticion')

        const data = jsonwebtoken.verify(token, process.env.SECRET_JWT_SEED!)
    
        const { uid, name, role } = data as JWTPayload

        req.headers['uid'] = uid
        req.headers['name'] = name
        req.headers['role'] = role

    } catch (error) {
        const msgError = error instanceof AuthError ? error.message : 'Token invalido.'
        const status = error instanceof AuthError ? error.status : 401

        return res.status(status).json({
            ok: false,
            msg: msgError,
        })
    }

    next();
}