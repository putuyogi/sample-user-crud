import Fastify, { FastifyInstance } from 'fastify'
import dotenv from 'dotenv'
import routes from './src/routes/Index'
import registers from './src/registers/Index'
import userService from './src/services/UserService'

dotenv.config()

const app: FastifyInstance = Fastify({})

const start = async () => {
    try {
        await registers(app)

        routes(app)

        await app.listen({ port: parseInt(process.env.PORT!), host: '0.0.0.0' })

        const address = app.server.address()
        const port = typeof address === 'string' ? address : address?.port

        console.log(`Server started successfully in port ${port}`);

        userService.seedTables(app)

        await app.ready()
        app.swagger()

    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start()