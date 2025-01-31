require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressFileUpload = require('express-fileupload')


// 中間件設定
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(expressFileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // 限制檔案大小 5MB
  abortOnLimit: true
}))

app.use('/api', routes)
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use(errorHandler)

app.listen(port, () => {
  console.log(`伺服器正運行在http://localhost:${port}`)
})
