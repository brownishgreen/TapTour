import 'dotenv/config'
import path from 'path'
import express from 'express'
import { swaggerUi, swaggerSpec } from './swagger.js'
import { fileURLToPath } from 'url'
import routes from './routes/index.js'
import errorHandler from './middlewares/error-handler.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 8080

// Swagger API document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//middleware 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const allowedOrigins = [
  'http://localhost:4173',
  'http://localhost:3000',
  'https://taptour.yuanologue.com',
  'https://tap-tour.vercel.app'
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  })
)
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(passport.initialize())

// provide static files (frontend)
app.use(express.static(path.join(__dirname, 'frontend/dist')))


// route setting
app.use('/api', routes)
app.get('/', (req, res) => {
  res.send('hello world')
})

// error handling
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
  console.log(`API document on http://localhost:${port}/api-docs`)
})
