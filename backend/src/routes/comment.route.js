import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { createComment, deleteComment, getComments } from '../controllers/comment.controller.js'
const router  = express.Router()

// public routes//
router.use(express.json())


router.get("/post/:postId", getComments)

// protected routes//

router.post('/post/:postId', protectRoute, createComment)
router.post('/:commentId', protectRoute, deleteComment)

export default router