/**
 * Module dependencies.
 */

import { Sequelize } from 'sequelize-typescript'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

/**
 * Get .env value to put in the connection.
 */
const database = process.env.SQLITE_DB as string
const storage = process.env.SQLITE_PATH as string

/**
 * Initialise SQLITE database connection.
 */
export const connection = new Sequelize({
  database: database,
  dialect: 'sqlite',
  username: 'username',
  password: 'password',
  storage:  ':memory:',
  logging: true
})
