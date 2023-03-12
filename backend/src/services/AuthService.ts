import { FastifyInstance } from "fastify";
import userService from "../services/UserService"
import jwt from 'jsonwebtoken'
import BadRequestError from "../errors/BadRequestError"

const signIn = async (app: FastifyInstance, email: string, password: string): Promise<any> => {
    // Check if email and password combination are matched
    const user = await userService.getUserByCredential(app, email, password)
    if (user === undefined) {
        throw new BadRequestError("Combination email and password are invalid.")
    }

    // Generate JWT token
    let token = jwt.sign({
        id: user.id,
        first_name: user.first_name,
    }, process.env.JWT_PRIVATE_KEY!, {
        expiresIn: 86400 // 24 hours
    })

    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        address: user.address,
        sex: user.sex,
        date_of_birth: user.date_of_birth,
        token: token
    }
}

const verifyToken = async (token: string) => {
    return await jwt.verify(token, process.env.JWT_PRIVATE_KEY!)
}

export default {
    signIn,
    verifyToken
}