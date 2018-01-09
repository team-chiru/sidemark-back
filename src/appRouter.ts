import * as express from 'express'
import { Router } from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { router as route } from './app/routes/likemark'

export class AppRouter {
  private _app: any
  private _mainRoute: string

  // mainRoute parameter is a path for express router.
  constructor (mainRoute: string) {
    this._mainRoute = mainRoute
    // Initialise express Router
    this._app = express()
    // Setup body parser
    this._app.use(bodyParser.json())
    // Setup cors to enable routes
    this._app.use(cors())
    // Initialise the main route for express.
    this._app.use(this._mainRoute, route)
  }

  get app (): any {
    return this._app
  }
}
