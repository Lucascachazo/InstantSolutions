const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
const router = require('./routes')
const fileUpload = require('express-fileupload')
const app = express()


app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use('/api', router)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+"/client/build/index.html"))
  })
}
const port = process.env.PORT || 4000
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host,  console.log('app listening'))
