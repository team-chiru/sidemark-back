/**
 * Use Router object from express
 */
import * as express from 'express'

import { Dao } from '../api/Dao'
import { Netscape } from '../api/Netscape'

export const router = express.Router()

/**
 * Define EndPoint routes
 */
router.get('/likemark/get/:id', Dao.get)
router.get('/likemark/getFirstChildren/:id', Dao.getFirstChildren)
router.get('/likemark/getWithFirstChildren/:id', Dao.getWithFirstChildren)
router.get('/likemark/list', Dao.list)
router.post('/likemark/post', Dao.post)
router.patch('/likemark/update/:id', Dao.update)
router.delete('/likemark/delete/:id', Dao.remove)

router.get('/likemark/export', Netscape.export)
router.post('/likemark/import', Netscape.import)
