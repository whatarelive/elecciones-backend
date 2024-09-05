import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { authRouter, votersRouter, votesRouter, deputiesRouter } from './routers'

// Creación de la aplicación de Express.
const app = express()

// Configuraciones de seguridad.
app.disable('x-powered-by')

// Middlewares
app.use(express.json()) // Configuración para convertir el body a JSON.
app.use(cors()) // Configuración previa de Cors.

// Configuración de Routers.
app.use('/api/auth', authRouter) // Responde a todas las rutas para autentificación.
app.use('/api/deputies', deputiesRouter) // Responde a todas las rutas del recurso [diputados].
app.use('/api/voters', votersRouter) // Responde a todas las rutas del recurso [votantes].
app.use('/api/votes', votesRouter) // Responde a todas las rutas del recurso [Votación].

// Configuración del puerto de escucha.
config() // permite la lectura de archivos .env
const PORT = process.env.PORT ?? 4001

// Creación del puerto de escucha de la aplicación de Express.
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
