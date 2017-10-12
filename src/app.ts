/**
 * Module dependencies.
 */
import * as express from 'express'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load routes from external files
import { router as route } from './app/routes/index'
import { userRouter as userRoute } from './app/routes/user'

// Load environment variables
dotenv.config()

// Declare express application and export to server
export const app = express()

// Set routes endpoint in the app
app.use('/', route)
app.use('/user',userRoute)
