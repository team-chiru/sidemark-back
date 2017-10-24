/**
 * Use Router object from express
 */
import * as express from 'express'
import * as entity from '../dao/entity'
export const router = express.Router()

/**
 * Define EndPoint routes
 */
router.get('/entity/get', entity.get)
router.get('/entity/external',entity.external)
router.post('/entity/post', entity.post)
