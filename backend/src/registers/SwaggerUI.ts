import { FastifyInstance } from "fastify"
import FastifySwaggerUI from "@fastify/swagger-ui"

export default async (app: FastifyInstance) => {
    await app.register(FastifySwaggerUI, {
        routePrefix: '/docs'
    })
}