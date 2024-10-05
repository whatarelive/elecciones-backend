import { v2 as cloudinary } from "cloudinary"

// Configuración de las variables de conexión al servicio de cloudinary.
export const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    })

    console.log('Server is conect the Cloudinary service...')
}