import express from 'express'
import { config } from 'dotenv'
import { validateCors } from './middlewares'
import { createConnect } from './database/config'
import { cloudinaryConfig } from './images/config'
import { authRouter, usersRouter, votesRouter, deputiesRouter } from './routers'

// Creación de la aplicación de Express.
const app = express()

// Configuraciones de seguridad.
app.disable('x-powered-by')

// Middlewares
app.use(express.json()) // Configuración para convertir el body a JSON.
app.use(validateCors()) // Configuración completa de CORS.

// permite la lectura de archivos .env
config() 

// Establece la configuración de conexión a Cloudinary.  
cloudinaryConfig()

// Establecer conexion con la Base de Datos de MongoDB.
createConnect()

// Configuración de Routers.
app.use('/api/auth', authRouter) // Responde a todas las rutas para autentificación.
app.use('/api/deputies', deputiesRouter) // Responde a todas las rutas del recurso [diputados].
app.use('/api/user', usersRouter) // Responde a todas las rutas del recurso [usuarios].
app.use('/api/votes', votesRouter) // Responde a todas las rutas del recurso [Votación].

// Creación del puerto de escucha de la aplicación de Express.
app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`)
})
