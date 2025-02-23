import 'dotenv/config'
import path from 'path'
import express from 'express'
import { swaggerUi, swaggerSpec } from './swagger.js'
import { fileURLToPath } from 'url'
import routes from './routes/index.js'
import errorHandler from './middlewares/error-handler.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressFileUpload from 'express-fileupload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
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
]
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], 
    credentials: true,
  })
)

// 提供靜態文件（前端）
app.use(express.static(path.join(__dirname, 'frontend/dist')))

// 檔案上傳設定
app.use(expressFileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制檔案大小 5MB
  abortOnLimit: true
}))

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
