import { FastifyInstance } from "fastify"
import FastifyCORS from "@fastify/cors"

export default async (app: FastifyInstance) => {
    await app.register(FastifyCORS, {
        origin: "*",
        methods: "*"
    })
}