import { Schema, model } from 'mongoose'
import { Elecciones } from '../interfaces/interfaces'

const EleccionesSchema = new Schema<Elecciones>({
    elecciones: {
        type: String,
        unique: true,
        required: true
    },
    finalDate: {
        type: String,
        required: true
    },
    cantVotes: {
        type: Number,
        required: true
    }
})

export default model('EleccionesModel', EleccionesSchema)