import express from 'express'
import { followUser, getCurrentUser, getUserProfile, syncUser, updateProfile } from '../controllers/user.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'
const router  = express.Router()

router.get('/profile/:username', getUserProfile)
router.put("/sync", protectRoute, syncUser)
router.put("/me", protectRoute, getCurrentUser)
router.put("/profile", protectRoute, updateProfile)
router.put("/follow/:targetUserId", protectRoute, followUser)

export default router