import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Database constant.
const database = process.env.SQLITE_DB as string
const username = process.env.SQLITE_USER as string
const password = process.env.SQLITE_PWD as string
const storage = process.env.SQLITE_PATH_BOOKSHELF as string
const host = process.env.MSSQL_HOST as string
const maxpool: number = Number(process.env.MSSQL_MAX_POOL)

// Set up database connection with knex.
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'database.db'
    // host     : '127.0.0.1',
    // user     : 'your_database_user',
    // password : 'your_database_password',
    // database : 'myapp_test',
    // charset  : 'utf8'
  }
})
// Set the knex connection wth the database to bookshelf ORM.
export const connection = require('bookshelf')(knex)
