require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: 'http://localhost:5173', // 替換為你的前端 URL
    credentials: true, // 允許攜帶憑證（Cookie）
  })
)
app.use(errorHandler)
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`伺服器正運行在http://localhost:${port}`)
})
