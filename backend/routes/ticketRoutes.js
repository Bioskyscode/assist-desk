import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getTickets, createTicket, getTicket, deleteTicket, updateTicket} from "../controllers/ticketController.js";
import noteRouter from './noteRoutes.js'

const router = express.Router()

//Reroute into node router
router.use("/:ticketId/notes", noteRouter)

router.route("/").get(protect, getTickets).post(protect, createTicket)
router.route("/:id").get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

export default router