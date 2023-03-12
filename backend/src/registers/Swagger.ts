import { FastifyInstance } from "fastify"
import FastifySwagger from "@fastify/swagger"

export default async (app: FastifyInstance) => {
    await app.register(FastifySwagger, {
        swagger: {
            info: {
                title: 'User API',
                description: 'User API Documentation',
                version: '0.1.0'
            },
            host: 'localhost',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        }
    })
}