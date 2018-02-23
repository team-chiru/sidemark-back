/**
 * Use Router object from express
 */
import * as express from 'express'
import { LikemarkDAO } from '../dao/likemark'
export const router = express.Router()

const likemarkDAO = new LikemarkDAO()

/**
 * Define EndPoint routes
 */
router.get('/likemark/get/:id', likemarkDAO.get.bind(likemarkDAO))
router.get('/likemark/getFirstChildren/:id', likemarkDAO.getFirstChildren.bind(likemarkDAO))
router.get('/likemark/getWithFirstChildren/:id', likemarkDAO.getWithFirstChildren.bind(likemarkDAO))
router.get('/likemark/list', likemarkDAO.list.bind(likemarkDAO))
router.get('/likemark/export', likemarkDAO.export.bind(likemarkDAO))
router.post('/likemark/post', likemarkDAO.post.bind(likemarkDAO))
router.post('/likemark/import', likemarkDAO.import.bind(likemarkDAO))
router.patch('/likemark/update/:id', likemarkDAO.update.bind(likemarkDAO))
router.delete('/likemark/delete/:id', likemarkDAO.remove.bind(likemarkDAO))
