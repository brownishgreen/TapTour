require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middleware/error-handler')
const cors = require('cors')


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

console.log(process.env.DB_USER, process.env.DB_PASSWORD)
console.log('DB_USER:', process.env.DB_USER)
console.log('DB_PASSWORD:', process.env.DB_PASSWORD)

app.listen(port, () => {
  console.log(`伺服器正運行在http://localhost:${port}`)
})

