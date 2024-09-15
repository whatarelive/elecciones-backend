import { Response } from 'express'
import { AuthError, ResourceError } from '../errors/CustomErrors'

interface Props {
    res: Response,
    error: any,
}

export const handlerError = ({res, error}: Props) => {
    // console.log(error)

    if (!(error instanceof AuthError || ResourceError)) {
        error['message'] = 'Por favor contacte con el servicio tecnico.'
        error['status'] = 500
    }

    return res.status(error.status).json({
        ok: false,
        message: error.message
    })
}