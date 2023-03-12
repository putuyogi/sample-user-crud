import { FastifyInstance } from "fastify"
import FastifyRedis from "@fastify/redis"

export default async (app: FastifyInstance) => {
    await app.register(FastifyRedis, {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT!),
    })
}