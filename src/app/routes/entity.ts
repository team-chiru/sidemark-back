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
router.get('/entity/get/:id', entityDAO.get)
router.get('/entity/list', entityDAO.list)
router.post('/entity/post', entityDAO.post)
router.patch('/entity/update/:id', entityDAO.update)
router.delete('/entity/delete/:id', entityDAO.remove)
