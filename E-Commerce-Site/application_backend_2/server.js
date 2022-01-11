require('dotenv').config()

const Hapi = require('@hapi/hapi')

const Routes = require('./routes')
const { dbConfig } = require('./config')
const jwt = require('jsonwebtoken')
const userDetailsModel = require('./models/userModel')

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {origin: ['*'],credentials: true}
        }
    })

    server.state('data', {
        ttl: null,
        isSecure: true,
        isHttpOnly: true
    })

    const validate = async (request, session) => {
        const data = await userDetailsModel.findOne({ _id : session.id });
        if(!data){
            return {valid : false}
        }
        return {valid: true, credential : data}
    }

    await server.register(require('@hapi/cookie'))

    server.auth.strategy('session', 'cookie', {
        cookie: {
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: false
        },

        validateFunc: validate
    })

    server.auth.default('session')

    dbConfig()

    await server.start();
    console.log('Server running on port 5000');

    server.route(Routes)
}

init()








