/**
 * Use Router object from express
 */
import * as express from 'express'
import * as entity from '../dao/entity'
export const router = express.Router()

/**
 * Define EndPoint routes
 */
router.get('/entity/get/:id', entity.get)
router.get('/entity/list', entity.list)
router.post('/entity/post', entity.post)
router.patch('/entity/update/:id', entity.update)
router.delete('/entity/delete/:id', entity.remove)
