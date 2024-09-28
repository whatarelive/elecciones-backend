import { Schema, model } from 'mongoose'
import { basicParams } from './BasicParams'
import { Admin } from '../interfaces/interfaces'

const AdminSchema = new Schema<Admin>({
    name: basicParams['name'],
    password: {
        type: String,
        required: true,
    }
})

export default model('AdminModel', AdminSchema)