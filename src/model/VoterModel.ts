import { Schema, model } from 'mongoose'
import { Voter } from '../interfaces/interfaces'
import { basicParams } from './BasicParams'

const VoterSchema = new Schema<Voter>({
    ...basicParams,
    ci: {
        required: true,
        type: String
    },
    isValidVoter: {
        required: true,
        type: Boolean
    }
})

export default model('VoterModel', VoterSchema)