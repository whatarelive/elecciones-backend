import { Schema, model } from 'mongoose'
import { basicParams } from './BasicParams'
import { Deputy } from '../interfaces/interfaces'

const DeputySchema = new Schema<Deputy>({
    ...basicParams,
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