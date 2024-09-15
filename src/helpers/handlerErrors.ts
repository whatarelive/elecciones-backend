import express from 'express'
import { AuthError, ResourceError } from '../errors/CustomErrors'

interface Props {
    res: express.Response,
    error: any,
}

export const handlerError = ({res, error}: Props) => {
    // console.log(error)

    if (!(error instanceof AuthError || ResourceError)) {
        error['message'] = 'Por favor contacte con el servicio tecnico.'
        error['statusCode'] = 500
    }

    return res.status(error.statusCode).json({
        ok: false,
        message: error.message
    })
}