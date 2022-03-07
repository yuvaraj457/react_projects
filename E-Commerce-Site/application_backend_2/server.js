require('dotenv').config()

const Hapi = require('@hapi/hapi')
// const jwt = require('jsonwebtoken')
const Path = require('path')
// const Routes = require('./routes')
const { dbConfig } = require('./config')
const jwt = require('hapi-auth-jwt2');


const userDetailsModel = require('./models/userModel')

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {origin: ['*'],credentials: true},
            files: {
                relativeTo: Path.join(__dirname, 'uploads')
            }
        }
    })


    await server.register(require('@hapi/cookie'))
    await server.register(require('@hapi/inert'))

    await server.register(jwt)

    const validate = async (decodedToken, req, h) => {
            console.log(decodedToken)
            
                const data = await userDetailsModel.findOne({_id : decodedToken._id})
                if(!data){
                    return {isValid : false}
                }
                return {isValid: true}
            }
    
        server.auth.strategy('jwt', 'jwt', {
          key: process.env.ACCESS_TOKEN_SECRET ,
          validate,
          verifyOptions: {algorithms: [ 'HS256' ]}
        });

        server.auth.default('jwt');


    await server.register([
        require('./plugins/productPlugin'),
        require('./plugins/userPlugin'), 
        require('./plugins/adminPlugin')
    ])



    // await server.register(require('hapi-pino'))

   


    // const validate = async (request, _id) => {
    //     const data = await userDetailsModel.findOne({ _id });
    //     if(!data){
    //         return {valid : false}
    //     }

    //     return {valid: true}
    // }

    // server.auth.strategy('session', 'cookie', {
    //     cookie: {
    //         password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
    //         isSecure: false,
    //         ttl : 40 * 1000 
    //     },

    //     validateFunc: validate
    // })

    // server.auth.default('session')



    // await server.register(require('hapi-auth-cookie-jwt'))

    // const validate = async (decodedToken, cb) => {
    //     console.log(decodedToken)
    //     const data = await userDetailsModel.findOne({_id : decodedToken._id})
    //     if(!data){
    //         return cb(null, false, decodedToken)
    //     }
    //     return cb(null, true, decodedToken) 
    // }

    // server.auth.strategy('token', 'jwt-cookie', {
    //     key: process.env.ACCESS_TOKEN_SECRET,
    //     validateFunc: validate
    // })

    // server.auth.default('token')

    
    dbConfig()

    await server.start();
    console.log('Server running on port 5000');
    
    // server.route(Routes)
    // request.logger.info('In handler %s', request.path)
}

init()








