import 'dotenv/config'

import express from 'express'
import { swaggerUi, swaggerSpec } from './swagger.js'
import path from 'path'
import { fileURLToPath } from 'url' // `__dirname` 替代方案
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressFileUpload from 'express-fileupload'

import routes from './routes/index.js' // 確保路由文件使用 `.js` 副檔名
import errorHandler from './middlewares/error-handler.js'
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const port = process.env.PORT || 8080

// Swagger 文件設定
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// 中間件設定
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

// 提供靜態文件（前端）
app.use(express.static(path.join(__dirname, 'frontend/dist')))

// 檔案上傳設定
app.use(
  expressFileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 限制檔案大小 5MB
    abortOnLimit: true,
  })
)

// 路由設定
app.use('/api', routes)
console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);


// 錯誤處理
app.use(errorHandler)

app.listen(port, () => {
  console.log(`伺服器正運行在http://localhost:${port}`)
  console.log(`API 文件在http://localhost:${port}/api-docs`)
})
