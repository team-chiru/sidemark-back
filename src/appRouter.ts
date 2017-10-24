import * as express from 'express'
import { Router } from '../node_modules/@types/express-serve-static-core/index'
import { router as route } from './app/routes/entity'

export class AppRouter {
  private app: any
  private mainRoute: string

  // mainRoute parameter is a path for express router.
  constructor (mainRoute: string) {
    this.mainRoute = mainRoute
    // Initialise express Router
    this.app = express()
    // // Initialise the main route for express.
    this.app.use(this.mainRoute, route)
  }

  get getApp (): any {
    return this.app
  }
  setAppRoute (route: any) {
    // Set specific routes
    this.app.use(this.mainRoute, route)
  }

}
