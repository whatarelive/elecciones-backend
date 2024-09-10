import { Schema, model } from 'mongoose'
import { Voter, ValidVoter } from '../interfaces/interfaces'
import { basicParams } from './BasicParams'

const VoterSchema = new Schema<Voter>({
    ...basicParams,
    isValidVoter: {
        required: true,
        type: { status: true, reason: '' } as ValidVoter
    }
})

export default model('Voter', VoterSchema)