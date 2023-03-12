const badRequestSchema = {
    description: 'Bad Request response',
    type: 'object',
    properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' }
    }
}

const forbiddenSchema = {
    description: 'Forbidden response',
    type: 'object',
    properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' }
    }
}

const internalServerErrorSchema = {
    description: 'Internal Server Error response',
    type: 'object',
    properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' }
    }
}

export default {
    badRequestSchema,
    forbiddenSchema,
    internalServerErrorSchema
}