import { Schema, model } from 'mongoose'
import { Deputy } from '../interfaces/interfaces'
import { basicParams } from './BasicParams'

const DeputySchema = new Schema<Deputy>({
    ...basicParams,
    image: {
        required: true,
        type: String
    },
    position: {
        required: true,
        type: String
    },
    biography: {
        required: true,
        type: String
    },
    votes: {
        required: true,
        type: Number
    },
})

export default model('DeputyModel', DeputySchema)