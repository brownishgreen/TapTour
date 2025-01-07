require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middleware/error-handler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`伺服器正運行在http://localhost:${port}`)
})
