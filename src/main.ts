/**
 * Module dependencies.
 */
import { Server } from './Server'
import { Row } from './models/Row'
import { connection as connection } from './config/database'

/**
 * Get port from environment and store in Express.
 */
const port: number = parseInt(process.env.PORT || '8080', undefined)
const server: Server = new Server(port, '/')

connection.authenticate().then(() => {
  // Add model to Sequelize instance.
  connection.addModels([Row])
  console.log('Likemark model is ready!')

  server.start()
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})
