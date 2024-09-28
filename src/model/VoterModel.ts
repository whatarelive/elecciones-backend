import { Schema, model } from 'mongoose'
import { basicParams } from './BasicParams'
import { Voter } from '../interfaces/interfaces'

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