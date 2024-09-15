import { Schema, model } from 'mongoose'
import { Voter } from '../interfaces/interfaces'
import { basicParams } from './BasicParams'

const VoterSchema = new Schema<Voter>({
    ...basicParams,
    isValidVoter: {
        required: true,
        type: Boolean
    }
})

export default model('VoterModel', VoterSchema)