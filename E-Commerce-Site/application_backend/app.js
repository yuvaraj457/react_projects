const express = require('express')
const cors = require('cors')
const expressJWT = require('express-jwt')
const app = express()

const indexRouter = require('./routes')
const { dbConfig } = require('./config')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({ "origin": "http://localhost:3000" }))

app.use(expressJWT({
    secret: process.env.Token_Secret,
    algorithms: ['HS256'],
    getToken: req => req.cookies.token
}).unless({ path: ['/login', '/logout'] }))

app.use('/', indexRouter)

app.use(express.static('public'))

dbConfig()

app.listen(5000, () => console.log('Server Started'))

