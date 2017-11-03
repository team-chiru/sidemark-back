/**
 * Use Router object from express
 */
import * as express from 'express'
import { EntityDAO } from '../dao/entity'
export const router = express.Router()

const entityDAO = new EntityDAO()

/**
 * Define EndPoint routes
 */
router.get('/entity/get/:id', entityDAO.get.bind(entityDAO))
router.get('/entity/list', entityDAO.list.bind(entityDAO))
router.post('/entity/post', entityDAO.post.bind(entityDAO))
router.patch('/entity/update/:id', entityDAO.update.bind(entityDAO))
router.delete('/entity/delete/:id', entityDAO.remove.bind(entityDAO))
