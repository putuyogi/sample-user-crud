import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import userController from "../controller/UserController";
import tokenVerification from "../middlewares/TokenVerification";
import userSchema from "./schemas/UserSchema";

const middlewares = async (request: FastifyRequest, reply: FastifyReply, done: any) => {
    await tokenVerification(request, reply);
    done()
}

export default (app: FastifyInstance) => {
    app.get('/users', { schema: userSchema.getUsersSchema, preHandler: [middlewares] }, userController.getUsers)
    app.get('/users/:id', { schema: userSchema.getUserSchema, preHandler: [middlewares] }, userController.getUser)
    app.post('/users', { schema: userSchema.addUserSchema }, userController.addUser)
    app.put('/users/:id', { schema: userSchema.editUserSchema, preHandler: [middlewares] }, userController.editUser)
    app.delete('/users/:id', { schema: userSchema.deleteUserSchema, preHandler: [middlewares] }, userController.deleteUser)
    app.post('/change-password/:id', { schema: userSchema.changePasswordSchema }, userController.changePassword)
}