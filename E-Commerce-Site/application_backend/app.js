const express = require('express')
const app = express()

const indexRouter = require('./routes')
const {dbConfig} = require('./config')

app.use('/', indexRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))

dbConfig()

app.listen(3000, () => console.log('Server Started'))

