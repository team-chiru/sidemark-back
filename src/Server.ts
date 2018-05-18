import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Router } from 'express'
import * as busboy from 'connect-busboy'
import * as cors from 'cors'

import { Dao } from './api/Dao'
import { Netscape } from './api/Netscape'

export class Server {
  private app: any
  private server: any
  private port: number

  constructor (port: number, mainRoute: string) {
    this.app = express() // Get Express App configuration

    this.app.use([
      bodyParser.json(),
      busboy(), // Files uploading
      cors() // Routes enabling
    ])

    this.app.use(mainRoute, this.router) // Initialise the main route for express

    this.server = http.createServer(this.app) // Create HTTP server.
    this.port = port
  }

  start () {
    // Set Port for express route.
    this.app.set('port', this.port)

    // Listen on provided port, on all network interfaces.
    this.server.listen(this.port)

    this.server.on('error', this.onError)
    this.server.on('listening', this.onListening.bind(this, this.server))
  }

  private get router () {
    const router = express.Router()

    router.get('/likemark/get/:id', Dao.get)
    router.get('/likemark/getFirstChildren/:id', Dao.getFirstChildren)
    router.get('/likemark/getWithFirstChildren/:id', Dao.getWithFirstChildren)
    router.get('/likemark/list', Dao.list)
    router.post('/likemark/post', Dao.post)
    router.patch('/likemark/update/:id', Dao.update)
    router.delete('/likemark/delete/:id', Dao.remove)

    router.get('/likemark/export', Netscape.export)
    router.post('/likemark/import', Netscape.import)

    return router
  }

  private onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    let bind = typeof this.port === 'string'
      ? 'Pipe ' + this.port
      : 'Port ' + this.port

    // Handle specific listen errors with friendly messages.
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
    let addr: any = server.address()
    let bind: string

    if ( typeof addr === 'string' ) {
      bind = 'pipe ' + addr
    } else {
      bind = 'port ' + addr.port
    }

    console.log('Listening on ' + bind)
  }
}
