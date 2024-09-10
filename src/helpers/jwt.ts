import jsonwebtoken from "jsonwebtoken"
import { JWTPayload } from "../interfaces/interfaces"


export const createJwt = ({ uid, name, role }: JWTPayload) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name, role }

        jsonwebtoken.sign(payload, process.env.SECRET_JWT_SEED!, {
            expiresIn: '1h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject(new Error('No se pudo filmar el token.'))
            }

            resolve(token)
        })        
    })
}