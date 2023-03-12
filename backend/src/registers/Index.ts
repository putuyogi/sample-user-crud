import { FastifyInstance } from "fastify"
import swaggerRegister from "./Swagger"
import swaggerUIRegister from "./SwaggerUI"
import mySQLRegister from "./MySQL"
import redisRegister from "./Redis"
import rateLimit from "./RateLimit"
import cors from "./CORS"

export default async (app: FastifyInstance) => {
    await swaggerRegister(app)
    await swaggerUIRegister(app);
    await mySQLRegister(app)
    await redisRegister(app)
    await rateLimit(app)
    await cors(app)
}