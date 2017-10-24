/**
 * Module dependencies.
 */
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import { AppRouter } from './appRouter'
import * as entity from './app/dao/entity'

export class Server {
  private _app: any
  private _server: any
  private _port: number
  private appRouter: AppRouter = new AppRouter('/entity')

  constructor (port: number) {
    // Get Express App configuration.ƒ
    this._app = this.appRouter.app
     // Create HTTP server.
    this._server = http.createServer(this._app)
    // Set the server port.
    this._port = port
  }

  start () {
    // Set Port for express route
    this._app.set('port', this._port)
    // Listen on provided port, on all network interfaces.
    this._server.listen(this._port)
    this._server.on('error', this.onError)
    this._server.on('listening', this.onListening.bind(this, this._server))
  }

  private onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    let bind = typeof this._port === 'string'
      ? 'Pipe ' + this._port
      : 'Port ' + this._port

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

  private onListening (server: any) {
    // console.log(server)
    let addr = server.address()
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
    console.log('Listening on ' + bind)
  }
}
