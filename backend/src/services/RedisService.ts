import { FastifyInstance } from "fastify";

const get = async (app: FastifyInstance, key: string): Promise<string | null> => {
    const { redis } = app
    return await redis.get(key)
}

const set = async (app: FastifyInstance, key: string, value: string): Promise<void> => {
    const { redis } = app
    await redis.set(key, value)
}

const deleteWithPrefix = async (app: FastifyInstance, prefixKey: string): Promise<void> => {
    const { redis } = app
    const keys = await redis.keys("*")
    const keysToRemove = keys.filter((x: string) => x.startsWith(prefixKey))
    if (keysToRemove.length > 0) {
        await redis.del(keysToRemove)
    }
}

export default {
    get,
    set,
    deleteWithPrefix
}