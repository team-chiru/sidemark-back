/**
 * Use Router object from express
 */
import * as express from 'express'
import * as entity from '../dao/entity'
export const router = express.Router()

/**
 * Define EndPoint routes
 */
router.get('/get', entity.get)
router.get('/external',entity.external)
router.post('/post', entity.post)
