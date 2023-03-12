import { FastifyInstance } from "fastify"
import FastifyRateLimit from "@fastify/rate-limit"

export default async (app: FastifyInstance) => {
    await app.register(FastifyRateLimit, {
        max: parseInt(process.env.API_RATE_LIMIT!)
    })
}