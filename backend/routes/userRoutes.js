import express from 'express'
import { registerUser, loginUser, getMe } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//signup route
router.post("/", registerUser)

//login route
router.post("/login", loginUser)

router.get("/me",protect, getMe)


export default router