import { FastifyInstance } from "fastify";
import authRoute from "./AuthRoute";
import userRoute from './UserRoute'

export default (app: FastifyInstance) => {
    userRoute(app)
    authRoute(app)
}