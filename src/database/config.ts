import mongoose from 'mongoose'

export const createConnect = async() => {
    try {
        await mongoose.connect(`mongodb+srv://mern_user:${process.env.DB_PASSWORD}@eleccionesdb.0osgy.mongodb.net/`)

        console.log('DB online...')

    } catch (error) {
        console.log(error)
        throw new Error('No se pudo inicializar la BD.')
    }
}