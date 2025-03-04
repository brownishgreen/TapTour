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

app.use(passport.initialize())

const port = process.env.PORT || 8080

// Swagger 文件設定
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// 中間件設定
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
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

// 提供靜態文件（前端）
app.use(express.static(path.join(__dirname, 'frontend/dist')))


// 路由設定
app.use('/api', routes)
app.get('/', (req, res) => {
  res.send('hello world')
})

// 錯誤處理
app.use(errorHandler)

app.listen(port, () => {
  console.log(`伺服器正運行在http://localhost:${port}`)
  console.log(`API 文件在http://localhost:${port}/api-docs`)
})
