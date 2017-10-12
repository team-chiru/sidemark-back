/**
 * Use Router object from express
 */
import * as express from 'express'
import * as user from '../dao/user'
export const userRouter = express.Router()

/**
 * Define EndPoint routes
 */
userRouter.get('/api', user.api)
userRouter.get('/api2', user.api2)
userRouter.post('/post', user.post)
