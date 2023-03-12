import { FastifyReply, FastifyRequest } from "fastify"
import BadRequestError from "../errors/BadRequestError"
import userService from "../services/UserService"
import userValidator from "../validators/UserValidator"
import User from "../models/User"
import ChangePassword from "../models/ChangePassword"
import NotFoundError from "../errors/NotFoundError"

const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const response = await userService.getUsers(
            request.server,
            (request.query as any).limit,
            (request.query as any).page,
            (request.query as any).keyword)
        return reply.code(200).send(response)
    } catch (err) {
        if (err instanceof BadRequestError) {
            return reply.code(400).send(err)
        } else {
            return reply.code(500).send(err)
        }
    }
}

const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const response = await userService.getUser(request.server, (request.params as any).id)
        if (response === undefined) return reply.code(404).send(new NotFoundError('User is not found.'))
        return reply.code(200).send(response)
    } catch (err) {
        if (err instanceof BadRequestError) {
            return reply.code(400).send(err)
        } else {
            return reply.code(500).send(err)
        }
    }
}

const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = request.body as User
        userValidator.validateAddUser(user)

        const emailExists = await userService.checkEmailIfExists(request.server, user.email)
        if (emailExists) return reply.code(400).send(new BadRequestError('Email is already been used. Please use another email.'))

        const response = await userService.addUser(request.server, user)
        return reply.code(200).send(response)
    } catch (err) {
        if (err instanceof BadRequestError) {
            return reply.code(400).send(err)
        } else {
            return reply.code(500).send(err)
        }
    }
}

const editUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const user = request.body as User
        userValidator.validateEditUser(user)
        const response = await userService.updateUser(request.server, user, (request.params as any).id)
        if (response === undefined) return reply.code(404).send(new NotFoundError('User is not found.'))
        return reply.code(200).send(response)
    } catch (err) {
        if (err instanceof BadRequestError) {
            return reply.code(400).send(err)
        } else {
            return reply.code(500).send(err)
        }
    }
}

const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await userService.deleteUser(request.server, (request.params as any).id)
        return reply.code(200).send()
    } catch (err) {
        if (err instanceof BadRequestError) {
            return reply.code(400).send(err)
        } else {
            return reply.code(500).send(err)
        }
    }
}

const changePassword = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const changePassword = request.body as ChangePassword
        userValidator.validateChangePassword(changePassword)
        
        const response = await userService.changeUserPassword(request.server, changePassword, (request.params as any).id)
        if (response === 0) return reply.code(404).send(new NotFoundError('User is not found.'))
        else if (response === 2) return reply.code(400).send(new BadRequestError('Password doesn\'t match with current password'))
        return reply.code(200).send()
    } catch (err) {
        if (err instanceof BadRequestError) {
            return reply.code(400).send(err)
        } else {
            return reply.code(500).send(err)
        }
    }
}

export default {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser,
    changePassword
}