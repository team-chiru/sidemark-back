/**
 * Module dependencies.
 */
import { Server } from './server'
import { connection as connection } from './app/config/database'

/**
 * Get port from environment and store in Express.
 */
const port: any = process.env.PORT
const server: Server = new Server(port)

connection
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.')
  server.start()
})
.catch(err => {
  console.error('Unable to connect to the database:', err)
})
