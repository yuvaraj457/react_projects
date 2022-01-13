require('dotenv').config()
const express = require('express')
const cors = require('cors')
const expressJWT = require('express-jwt')
const cookieParser = require('cookie-parser')


const app = express()
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

const indexRouter = require('./routes')
const { dbConfig } = require('./config')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(expressJWT({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
    getToken: req => req.cookies.token
}).unless({ path: ['/login','/signup', '/logout'] }))

app.use('/', indexRouter)

app.use('/static',express.static('uploads'))

dbConfig()

app.listen(5000, () => console.log('Server Started'))

