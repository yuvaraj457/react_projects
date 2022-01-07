const Hapi = require('@hapi/hapi')

const Routes = require('./routes')
const { dbConfig } = require('./config')

const init = async () => {
    const server = Hapi.server({
            port: 5000,
            host: 'localhost',
            routes: {
                cors: true
        }
    })

    server.state('data', {
        ttl: null,
        isSecure: true,
        isHttpOnly: true
    })

    dbConfig()

    await server.start();
    console.log('Server running on port 3000');

    server.route(Routes)
}

init()








