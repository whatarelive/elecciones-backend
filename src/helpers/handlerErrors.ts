import { Response } from 'express'
import { AuthError, ResourceError } from '../errors/CustomErrors'

// Parametros de la función handlerError.
interface Props {
    res: Response,
    error: any,
}

// Función para manejar los errores en el servidor. 
export const handlerError = ({res, error}: Props) => {
    // Si el error no es personalizado, se le agregan las propiedades al error.prototype
    if (!(error instanceof AuthError || ResourceError)) {
        error['message'] = 'Por favor contacte con el servicio técnico.'
        error['type'] = 'Internal Server Error'
    }

    // Respuesta que va a recibir el cliente en caso de un error. 
    return res.status(error.status || 500).json({
        ok: false,
        errorType: error.type,
        message: error.message
    })
}