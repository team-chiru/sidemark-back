import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Router } from '../node_modules/@types/express-serve-static-core/index'
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
    // Initialise the main route for express.
    this._app.use(this._mainRoute, route)
  }

  get app (): any {
    return this._app
  }
}
