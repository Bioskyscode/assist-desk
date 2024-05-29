import asyncHandler from 'express-async-handler'
import Ticket from '../models/ticketModel.js';
import Note from '../models/noteModel.js'

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {

    try {
         // Get ticket with the found user
         const ticket = await Ticket.findById(req.params.ticketId)
         if (ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error("User not authorized")
         }

         const notes = await Note.find({ticket: req.params.ticketId})
         res.status(200).json(notes)
        
    } catch (error) {
        throw new Error(error.message)
    }
})

// @desc Create note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {

    try {
         // Get ticket with the found user
         const ticket = await Ticket.findById(req.params.ticketId)
         if (ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error("User not authorized")
         }

         const note = await Note.create({
            text: req.body.text,
            isStaff: false,
            ticket: req.params.ticketId,
            user: req.user.id
        })
         res.status(200).json(note)
        
    } catch (error) {
        throw new Error(error.message)
    }
})


export {getNotes, addNote}