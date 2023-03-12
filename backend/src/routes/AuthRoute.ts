import { FastifyInstance } from "fastify";
import authController from "../controller/AuthController";
import authSchema from "./schemas/AuthSchema";

export default (app: FastifyInstance) => {
    app.post('/sign-in', { schema: authSchema.signInSchema }, authController.signIn)
}