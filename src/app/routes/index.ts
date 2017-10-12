/**
 * Use Router object from express
 */
import * as express from 'express'
import * as index from '../dao/index'
export const router = express.Router()

/**
 * Define EndPoint routes
 */
router.get('/api', index.api)
router.get('/external',index.external)
router.post('/post', index.post)
