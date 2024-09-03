import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { deputiesRouter } from './routers/deputy'

// Creación de la aplicación de Express.
const app = express()

// Configuraciones de seguridad.
app.disable('x-powered-by')

// Middlewares
app.use(express.json()) // Configuración para convertir el body a JSON.
app.use(cors()) // Configuración previa de Cors.

// Configuración de Routers.
app.use('/api/deputies', deputiesRouter) // Responde a todas las rutas del recurso [diputados].

// Configuración del puerto de escucha.
config()
const PORT = process.env.PORT ?? 4001

// Creación del puerto de escucha de la aplicación de Express.
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
