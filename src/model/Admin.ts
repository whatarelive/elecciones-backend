import { Schema, model } from 'mongoose'
import { Admin } from '../interfaces/interfaces'
import { basicParams } from './BasicParams'

const AdminSchema = new Schema<Admin>({
    name: basicParams['name'],
    password: {
        type: String,
        required: true,
    }
})

export default model('Admin', AdminSchema)