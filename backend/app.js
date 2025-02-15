import 'dotenv/config' 

const express = require('express')
const { swaggerUi, swaggerSpec } = require('./swagger')
const app = express()

const path = require('path')
const port = process.env.PORT || 8080
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressFileUpload = require('express-fileupload')

// Swagger 文件設定
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// 中間件設定
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({
  origin: ['http://localhost:5173', 'https://taptour-817210876591.asia-east1.run.app'],
  credentials: true
}))

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

app.listen(port, '0.0.0.0', () => {
  console.log(`伺服器運行在 http://0.0.0.0:${port}`);
})  
