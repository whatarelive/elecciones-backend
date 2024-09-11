import express from 'express';
import AuthError from '../errors/CustomErrors';

interface Props {
    res: express.Response,
    error: any,
}

export const handlerError = ({res, error}: Props) => {
    console.log(error)

    if (!(error instanceof AuthError)) {
        error['message'] = 'Por favor contacte con el servicio tecnico.'
        error['statusCode'] = 500
    }

    return res.status(error.statusCode).json({
        ok: false,
        message: error.message
    })
}