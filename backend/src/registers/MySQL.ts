import { FastifyInstance } from "fastify"
import FastifyMySql from "@fastify/mysql"

export default async (app: FastifyInstance) => {
    await app.register(FastifyMySql, {
        connectionString: process.env.MYSQL_CONNECTION_STRING,
        promise: true
    })
}