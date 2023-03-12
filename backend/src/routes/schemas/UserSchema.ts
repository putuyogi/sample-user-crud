import { FastifySchema } from 'fastify'
import errorSchema from './ErrorSchema'

export const defaultAuthencationHeader = {
    type: 'object',
    properties: {
        'Authorization': { type: 'string' }
    },
    required: ['Authorization']
}

export const userSchemaWithoutPassword = {
    first_name: { type: 'string' },
    last_name: { type: ['string', 'null'] },
    email: { type: 'string' },
    sex: { type: 'string' },
    date_of_birth: { type: 'string' },
    address: { type: ['string', 'null'] }
}

export const userSchema = {
    ...userSchemaWithoutPassword,
    password: { type: 'string' },
}

export const userSchemaWithId = {
    id: { type: 'string' },
    ...userSchema
}

const addUserSchema: FastifySchema = {
    summary: 'Add new User',
    body: {
        type: 'object',
        properties: userSchema
    },
    response: {
        200: {
            description: 'Response when user created successfully',
            type: 'object',
            properties: userSchemaWithId
        },
        400: errorSchema.badRequestSchema,
        403: errorSchema.forbiddenSchema,
        500: errorSchema.internalServerErrorSchema,
    }
}

const editUserSchema: FastifySchema = {
    summary: 'Edit User',
    headers: defaultAuthencationHeader,
    params: {
        id: { type: 'string' }
    },
    body: {
        type: 'object',
        properties: userSchemaWithoutPassword
    },
    response: {
        200: {
            description: 'Response when user updated successfully',
            type: 'object',
            properties: userSchemaWithId
        },
        400: errorSchema.badRequestSchema,
        403: errorSchema.forbiddenSchema,
        500: errorSchema.internalServerErrorSchema,
    }
}

const deleteUserSchema: FastifySchema = {
    summary: 'Delete User',
    headers: defaultAuthencationHeader,
    params: {
        id: { type: 'string' }
    },
    response: {
        200: {
            description: 'Response when user deleted successfully',
            type: 'string'
        },
        400: errorSchema.badRequestSchema,
        403: errorSchema.forbiddenSchema,
        500: errorSchema.internalServerErrorSchema,
    }
}

const getUsersSchema: FastifySchema = {
    summary: 'Get Users',
    headers: defaultAuthencationHeader,
    querystring: {
        limit: { type: 'string' },
        page: { type: 'string' },
        keyword: { type: 'string' }
    },
    response: {
        200: {
            description: 'Get Users Response',
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: userSchemaWithId
                    }
                },
                total_data: { type: 'number' }
            }
        },
        400: errorSchema.badRequestSchema,
        403: errorSchema.forbiddenSchema,
        500: errorSchema.internalServerErrorSchema,
    }
}

const getUserSchema: FastifySchema = {
    summary: 'Get User',
    headers: defaultAuthencationHeader,
    params: {
        id: { type: 'string' }
    },
    response: {
        200: {
            description: 'Get User Response',
            type: 'object',
            properties: userSchemaWithId
        },
        400: errorSchema.badRequestSchema,
        403: errorSchema.forbiddenSchema,
        500: errorSchema.internalServerErrorSchema,
    }
}

const changePasswordSchema: FastifySchema = {
    summary: 'Change Password',
    headers: defaultAuthencationHeader,
    params: {
        id: { type: 'string' }
    },
    body: {
        type: 'object',
        properties: {
            current_password: { type: 'string' },
            new_password: { type: 'string' },
            retype_new_password: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Response when user changed password successfully',
            type: 'string',
        },
        400: errorSchema.badRequestSchema,
        403: errorSchema.forbiddenSchema,
        500: errorSchema.internalServerErrorSchema,
    }
}

export default {
    addUserSchema,
    editUserSchema,
    deleteUserSchema,
    getUsersSchema,
    getUserSchema,
    changePasswordSchema
}