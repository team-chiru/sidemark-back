/**
 * Use Router object from express
 */
import * as express from 'express'
import { LikemarkAPI } from '../dao/LikemarkAPI'
export const router = express.Router()

const api = new LikemarkAPI()

/**
 * Define EndPoint routes
 */
router.get('/likemark/get/:id', api.get.bind(api))
router.get('/likemark/getFirstChildren/:id', api.getFirstChildren.bind(api))
router.get('/likemark/getWithFirstChildren/:id', api.getWithFirstChildren.bind(api))
router.get('/likemark/list', api.list.bind(api))
router.get('/likemark/export', api.export.bind(api))
router.post('/likemark/post', api.post.bind(api))
router.post('/likemark/import', api.import.bind(api))
router.patch('/likemark/update/:id', api.update.bind(api))
router.delete('/likemark/delete/:id', api.remove.bind(api))
