import { FastifySchema } from 'fastify'
import errorSchema from './ErrorSchema'
import { userSchemaWithId } from './UserSchema'

const signInSchema: FastifySchema = {
    summary: 'Sign-in',
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Response when user signed-in successfully',
            type: 'object',
            properties: {
                ...userSchemaWithId,
                token: { type: 'string' },
            }
        },
        400: errorSchema.badRequestSchema,
        403: errorSchema.forbiddenSchema,
        500: errorSchema.internalServerErrorSchema,
    }
}

export default {
    signInSchema
}