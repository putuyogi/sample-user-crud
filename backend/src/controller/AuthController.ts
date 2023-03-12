import { FastifyReply, FastifyRequest } from "fastify"
import BadRequestError from "../errors/BadRequestError"
import authService from "../services/AuthService"

const signIn = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const response = await authService.signIn(request.server, (request.body as any).email, (request.body as any).password)
        return reply.code(200).send(response)
    } catch (err) {
        if (err instanceof BadRequestError) {
            return reply.code(400).send(err)
        } else {
            return reply.code(500).send(err)
        }
    }
}

export default {
    signIn
}