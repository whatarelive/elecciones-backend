import cors from 'cors'

const ACCEPTED_ORIGIN = [
    'http://localhost:5173/'
]

export const validateCors = () => {
    return cors({
        origin(requestOrigin, callback) {
            if (ACCEPTED_ORIGIN.includes(requestOrigin!)) {
                return callback(null, true)
            }

            if (!requestOrigin) {
                return callback(null, true)
            }

            return callback(new Error("Not allowed by CORS"))
        },
    })
}