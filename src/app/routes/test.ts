/**
 * Use Router object from express
 */
import * as express from 'express'
import * as entity from '../dao/entity'
export const routerTest = express.Router()

/**
 * Define EndPoint routes
 */
routerTest.get('/test/test', entity.get)
routerTest.get('/test/external',entity.external)
routerTest.post('/test/post', entity.post)
