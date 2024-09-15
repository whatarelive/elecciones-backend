import express from 'express';
import jsonwebtoken from "jsonwebtoken";
import { JWTPayload } from '../interfaces/interfaces';

export const validarJWT = ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
    const token = req.header('x-token');

    try {
        if (!token) throw new Error("No hay token en la peticion")

        const data = jsonwebtoken.verify(token, process.env.SECRET_JWT_SEED!)
    
        const { uid, name, role } = data as JWTPayload

        req.headers['uid'] = uid
        req.headers['name'] = name
        req.headers['role'] = role

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: error || 'Token no valido'
        })
    }

    next();
}