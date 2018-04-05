/**
 * Module dependencies.
 */
import { Server } from './server'
import { LikemarkRow } from './models/LikemarkRow'
import { connection as connection } from './config/database'

/**
 * Get port from environment and store in Express.
 */
const port: any = process.env.PORT
const server: Server = new Server(port)

connection.authenticate().then(() => {
  // Add model to Sequelize instance.
  connection.addModels([LikemarkRow])
  console.log('Likemark model is ready!')

  server.start()
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})
