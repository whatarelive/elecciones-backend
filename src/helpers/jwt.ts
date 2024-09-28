import jsonwebtoken from "jsonwebtoken"
import { JWTPayload } from "../interfaces/interfaces"

// Función para crear un JSON-WEB-TOKEN para el usuario. 
export const createJwt = ({ uid, name, role }: JWTPayload) => {
    // Se trabaja con promesas para poder hacer una implementación asíncrona.
    // Debido a que la librería no consta con una implementación de este tipo.
    return new Promise((resolve, reject) => {
        // Contrucción del objeto payload del Token. 
        const payload = { uid, name, role }

        // Firma del payload en Token usando la palabra secreta declarada en la variables de entorno.  
        jsonwebtoken.sign(payload, process.env.SECRET_JWT_SEED!, {
            expiresIn: '4h' // Tiempo de vida del Token. 
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject(new Error('No se pudo filmar el token.'))
            }

            // Si se resuelve correctamente la promesa se obtiene el token. 
            resolve(token)
        })        
    })
}