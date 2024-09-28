import mongoose from 'mongoose'

// Funcion de conexión a la base de datos.
export const createConnect = async() => {
    try {
        await mongoose.connect(`mongodb+srv://mern_user:${process.env.DB_PASSWORD}@eleccionesdb.0osgy.mongodb.net/`)

        console.log('DB online...')

    } catch (error) {
        console.log(error)
        console.log('No se pudo inicializar la BD.')
    }
}