/**
 * Module dependencies.
 */
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import { AppRouter } from './appRouter'
import * as entity from './app/dao/entity'

export class Server {
  private app: any
  private server: any
  private port: number
  private appRouter: AppRouter = new AppRouter('/')

  constructor (port: number) {
    // Get Express App configuration.
    this.app = this.appRouter.getApp()
     // Create HTTP server.
    this.server = http.createServer(this.app)
    // Set the server port.
    this.port = port
  }

  start = () => {
    // Set Port for express route
    this.app.set('port', this.port)
    // Listen on provided port, on all network interfaces.
    this.server.listen(this.port)
    this.server.on('error', this.onError)
    this.server.on('listening', this.onListening)
  }

  onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    let bind = typeof this.port === 'string'
      ? 'Pipe ' + this.port
      : 'Port ' + this.port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }

  onListening () {
    let addr = this.server.address()
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
    console.log('Listening on ' + bind)
  }
}
