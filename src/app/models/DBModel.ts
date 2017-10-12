/**
 * Module dependencies.
 */
import * as Sequelize from 'sequelize'
import * as dotenv from 'dotenv'

/**
 * Get .env value to put in the connection
 */
const database = process.env.MSSQL_DB as string
const username = process.env.MSSQL_USER as string
const password = process.env.MSSQL_PWD as string
const host = process.env.MSSQL_HOST as string
const maxpool: number = Number(process.env.MSSQL_MAX_POOL)

/**
 * Initialise MMSQL database connection.
 */
export const connection = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mssql',
  pool: {
    max: maxpool,
    min: 0,
    idle: 10000
  }
})

console.log('Database model is ready!')
