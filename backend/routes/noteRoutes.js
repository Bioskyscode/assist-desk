import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
import { getNotes, addNote } from '../controllers/noteController.js'

const router = express.Router({mergeParams: true})

router.route("/").get(protect, getNotes).post(protect, addNote)

export default router