/**
 * Use Router object from express
 */
import * as express from 'express'
import * as index from '../dao/entity'
export const router = express.Router()

/**
 * Define EndPoint routes
 */
router.get('/get', index.get)
router.get('/external',index.external)
router.post('/post', index.post)
