import { FastifyInstance } from "fastify"
import { MySQLPromisePool } from "@fastify/mysql"
import User from "../models/User"
import redisService from "./RedisService"
import cryptoHelper from "../helpers/CryptoHelper"
import ChangePassword from "../models/ChangePassword"
import commonHelper from '../helpers/CommonHelper'

declare module 'fastify' {
    interface FastifyInstance {
        mysql: MySQLPromisePool,
    }
}

interface UsersResponse {
    data: Array<User>,
    total_data: number
}

const seedTables = async (app: FastifyInstance) => {
    const connection = await app.mysql.getConnection()
    await connection.query("CREATE TABLE IF NOT EXISTS `tb_users` (`id` INT(10) NOT NULL AUTO_INCREMENT, `first_name` VARCHAR(200) DEFAULT NULL, `last_name` VARCHAR(200) DEFAULT NULL, `email` VARCHAR(200) DEFAULT NULL, `password` VARCHAR(200) DEFAULT NULL, `sex` VARCHAR(200) DEFAULT NULL, `date_of_birth` DATE DEFAULT NULL, `address` TEXT, `deleted` TINYINT(1) DEFAULT '0', PRIMARY KEY (`id`)) ENGINE=INNODB;")
    connection.release()
}

const getUsers = async (app: FastifyInstance,
    limit: string | undefined,
    page: string | undefined,
    keyword: string | undefined,
    cache: boolean = true): Promise<UsersResponse> => {

    // Check in cache if list users exist
    let redisKey = `getUsers`

    let sqlCondition = ''
    let sqlPagination = ''

    // Incorporate keyword if it is not null and empty
    if (!commonHelper.isNullOrEmpty(keyword)) {
        redisKey += `_${keyword}`
        sqlCondition += ` AND (first_name LIKE '%${keyword}%' OR last_name LIKE '%${keyword}%')`
    }

    // Incorporate pagination if they are not null and empty
    if (!commonHelper.isNullOrEmpty(limit) && !commonHelper.isNullOrEmpty(page)) {
        redisKey += `_${limit}_${page}`
        sqlPagination += ` LIMIT ${page},${limit}`
    }

    if (cache) {
        const cachedData = await redisService.get(app, redisKey)
        if (cachedData != null) return JSON.parse(cachedData) as UsersResponse
    }

    // Get users
    const connection = await app.mysql.getConnection()
    const [data]: any = await connection.query(`SELECT * FROM tb_users WHERE deleted='0' ${sqlCondition} ${sqlPagination}`)
    const [totalRecords]: any = await connection.query(`SELECT COUNT(*) AS TotalData FROM tb_users WHERE deleted='0' ${sqlCondition}`)
    connection.release()

    const response = {
        data,
        total_data: totalRecords[0].TotalData
    }

    // Set users to cache for future use
    if (cache) await redisService.set(app, redisKey, JSON.stringify(response))

    return response
}

const getUser = async (app: FastifyInstance, id: number, cache: boolean = true): Promise<User> => {
    // Check in cache if detail user exist
    const redisKey = `getUser_${id}`
    if (cache) {
        const cachedData = await redisService.get(app, redisKey)
        if (cachedData != null) return JSON.parse(cachedData) as User
    }

    // Get detail user
    const connection = await app.mysql.getConnection()
    const [response]: any = await connection.query(`SELECT * FROM tb_users WHERE id='${id}' AND deleted='0'`)
    connection.release()

    // Set user to cache for future use
    if (cache && response[0] !== undefined) await redisService.set(app, redisKey, JSON.stringify(response[0]))

    return response[0]
}

const checkEmailIfExists = async (app: FastifyInstance, email: string): Promise<boolean> => {
    // Check if email already exists in data collection
    const connection = await app.mysql.getConnection()
    const [response]: any = await connection.query(`SELECT * FROM tb_users WHERE email='${email}'`)
    connection.release()

    return response.length > 0
}

const addUser = async (app: FastifyInstance, user: User, cache: boolean = true): Promise<User> => {
    // Add new
    const connection = await app.mysql.getConnection()
    const [response]: any = await connection.query(`INSERT INTO tb_users SET first_name='${user.first_name}', last_name='${(user.last_name ?? null)}', email='${user.email}', password='${cryptoHelper.encrypt(user.password)}', sex='${user.sex}', date_of_birth='${user.date_of_birth}', address='${(user.address ?? null)}'`)
    connection.release()

    // Clean cache for user since data is added
    if (cache) await redisService.deleteWithPrefix(app, `getUsers`)

    // Get detail user and return to caller
    return await getUser(app, response.insertId, cache)
}

const updateUser = async (app: FastifyInstance, user: User, id: number, cache: boolean = true): Promise<User | undefined> => {
    // Sanity check if user is not deleted
    const userData = await getUser(app, id, cache)
    if (userData !== undefined) {
        // Update
        const connection = await app.mysql.getConnection()
        await connection.query(`UPDATE tb_users SET first_name='${user.first_name}', last_name='${(user.last_name ?? null)}', sex='${user.sex}', date_of_birth='${user.date_of_birth}', address='${(user.address ?? null)}' WHERE id='${id}'`)
        connection.release()

        // Clean cache for list and detail user since data is updated
        if (cache) {
            await redisService.deleteWithPrefix(app, `getUsers`)
            await redisService.deleteWithPrefix(app, `getUser_${id}`)
        }

        // Get detail user and return to caller
        return await getUser(app, id, cache)
    }
    return undefined
}

const deleteUser = async (app: FastifyInstance, id: number, cache: boolean = true): Promise<void> => {
    // Delete
    const connection = await app.mysql.getConnection()
    await connection.query(`UPDATE tb_users SET deleted='1' WHERE id='${id}'`)
    connection.release()

    // Clean cache for list and detail user since data is updated
    if (cache) {
        await redisService.deleteWithPrefix(app, `getUsers`)
        await redisService.deleteWithPrefix(app, `getUser_${id}`)
    }
}

const getUserByCredential = async (app: FastifyInstance, email: string, password: string): Promise<User> => {
    // Get data by email and password
    const connection = await app.mysql.getConnection()
    const [response]: any = await connection.query(`SELECT * FROM tb_users WHERE email='${email}' AND password='${cryptoHelper.encrypt(password)}'`)
    connection.release()

    return response[0]
}

const changeUserPassword = async (app: FastifyInstance, changePassword: ChangePassword, id: number, cache: boolean = true): Promise<number> => {
    // Get user data and check if the existing password matches with current_password field
    const userData = await getUser(app, id, cache)
    if (userData == undefined) return 0
    if (userData.password !== cryptoHelper.encrypt(changePassword.current_password)) return 2

    // Update
    const connection = await app.mysql.getConnection()
    await connection.query(`UPDATE tb_users SET password='${cryptoHelper.encrypt(changePassword.new_password)}' WHERE id='${id}'`)
    connection.release()

    // Clean cache for detail user since data is updated
    if (cache) await redisService.deleteWithPrefix(app, `getUser_${id}`)

    return 1
}

export default {
    getUsers,
    getUser,
    addUser,
    updateUser,
    changeUserPassword,
    deleteUser,
    getUserByCredential,
    checkEmailIfExists,
    seedTables
}