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
router.get('/entity/get/:uuId', entityDAO.get.bind(entityDAO))
router.get('/entity/getFirstChild/:uuId', entityDAO.getFirstChild.bind(entityDAO))
router.get('/entity/list', entityDAO.list.bind(entityDAO))
router.post('/entity/post', entityDAO.post.bind(entityDAO))
router.patch('/entity/update/:uuId', entityDAO.update.bind(entityDAO))
router.delete('/entity/delete/:uuId', entityDAO.remove.bind(entityDAO))
