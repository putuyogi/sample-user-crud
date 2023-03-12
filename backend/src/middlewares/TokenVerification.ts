import { FastifyReply, FastifyRequest } from "fastify";
import BadRequestError from "../errors/BadRequestError";
import ForbiddenError from "../errors/ForbiddenError";
import authService from "../services/AuthService";

const tokenVerification = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.headers.authorization;
    if (!token) {
        reply.code(403).send(new BadRequestError('Please provide Authorization Token.'))
    }

    try {
        await authService.verifyToken(token!.replace('Bearer ', ''));
    } catch (err: any) {
        reply.code(403).send(new ForbiddenError('Unauthorized access.'))
    }
}

export default tokenVerification