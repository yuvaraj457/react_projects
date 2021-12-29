const express = require('express')
const cors = require('cors')
const app = express()

const indexRouter = require('./routes')
const {dbConfig} = require('./config')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({"origin":"http://localhost:3000"}))

app.use('/', indexRouter)

app.use(express.static('public'))

dbConfig()

app.listen(5000, () => console.log('Server Started'))

