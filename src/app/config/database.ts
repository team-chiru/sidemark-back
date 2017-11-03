/**
 * Module dependencies.
 */
import { Sequelize } from 'sequelize-typescript'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

/**
 * Get .env value to put in the connection
 */
const database = process.env.SQLITE_DB as string
const username = process.env.SQLITE_USER as string
const password = process.env.SQLITE_PWD as string
const storage = process.env.SQLITE_PATH as string
const host = process.env.MSSQL_HOST as string
const maxpool: number = Number(process.env.MSSQL_MAX_POOL)

/**
 * Initialise SQLITE database connection.
 */
export const connection = new Sequelize({
  database: database,
  dialect: 'sqlite',
  username: username,
  password: password,
  storage:  storage,
  logging: true
})
