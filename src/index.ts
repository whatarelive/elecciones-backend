import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { diputadosRouter } from './routers/diputados'

// Creacion de la aplicacion de Express.
const app = express()

// Configuariones de seguridad.
app.disable('x-powered-by')

// Middlewares
app.use(express.json()) // Configuracion para convertir el body a JSON.
app.use(cors()) // Configuracion previa de Cors.

// Configuracion de Routers.
app.use('/api/diputado', diputadosRouter) // Responde a todas las rutas del recurso [diputados].

// Configuracion del puerto de escucha.
config()
const PORT = process.env.PORT ?? 4001

// Creacion del puerto de escucha de la aplicacion de Express.
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
