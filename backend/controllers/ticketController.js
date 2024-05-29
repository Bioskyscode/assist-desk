import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Ticket from '../models/ticketModel.js'


// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {

    // check if JWT does not return empty user
    try {
        if (!req.user || !req.user.id) {
        //    console.log("req user:", req.user)
        //    console.log("req user Id:", req.user.id)
            res.status(401);
            throw new Error("User not authenticated");
        }

       //Get user using the id in the jwt
        const user = await User.findById(req.user.id)
       //   console.log("user Id:", user)
         if (!user) {
             res.status(401)
            throw new Error("User not found")
   
         }

         // Get ticket with the found user
         const tickets = await Ticket.find({user: req.user.id})
         res.status(200).json(tickets)
        
    } catch (error) {
        throw new Error(error.message)
    }
})


// @desc Get user ticket
// @route GET /api/tickets/ :id
// @access Private
const getTicket = asyncHandler(async (req, res) => {

    // check if JWT does not return empty user
    try {
        if (!req.user || !req.user.id) {
        //    console.log("req user:", req.user)
        //    console.log("req user Id:", req.user.id)
            res.status(401);
            throw new Error("User not authenticated");
        }

       //Get user using the id in the jwt
        const user = await User.findById(req.user.id)
       //   console.log("user Id:", user)
         if (!user) {
             res.status(401)
            throw new Error("User not found")
   
         }

         // Get ticket by user id
         const ticket = await Ticket.findById(req.params.id)

         // check if ticket is found
         if (!ticket) {
            res.status(404)
            throw new Error("Ticket not found")
         }

         // validate only authorized user can get ticket
          if (ticket.user.toString() !== req.user.id) {
             res.status(401)
             throw new Error("Not Authotized")
          }
         res.status(200).json(ticket)
        
    } catch (error) {
        throw new Error(error.message)
    }
})

// @desc Create new tickets
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body

    // Validate user input
    try {
        if (!product || !description) {
            res.status(400)
            throw new Error("Please add a product and description")
        }
    
        // Get user using the id in the JWT
        const user = await User.findById(req.user.id)
        if (!user) {
            res.status(400)
            throw new Error("user not found")
        }
    
        // Create Ticket
        const ticket = await Ticket.create({
            product,
            description,
            user: req.user.id,
            status: "new"
        })
    
        res.status(201).json(ticket)
        
    } catch (error) {
        throw new Error(error.message)
    }

})

// @desc Delete user ticket
// @route DELETE /api/tickets/ :id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {

    // check if JWT does not return empty user
    try {
        if (!req.user || !req.user.id) {
            res.status(401);
            throw new Error("User not authenticated");
        }

       //Get user using the id in the jwt
        const user = await User.findById(req.user.id)
       //   console.log("user Id:", user)
         if (!user) {
             res.status(401)
            throw new Error("User not found")
   
         }

         // Get ticket by user id
         const ticket = await Ticket.findById(req.params.id)

         // check if ticket is found
         if (!ticket) {
            res.status(404)
            throw new Error("Ticket not found")
         }
         
         // validate only authorized user can delete ticket
          if (ticket.user.toString() !== req.user.id) {
             res.status(401)
             throw new Error("Not Authotized")
          }

          // Delete ticket
          await ticket.deleteOne({_id: req.params.id})

         res.status(200).json({success: true, message: "ticket deleted"})
        
    } catch (error) {
        throw new Error(error.message)
    }
})


// @desc Update user ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
//  const {product, description} = req.body

//  // Validate user input
//         if (!product && !description) {
//          res.status(400)
//             throw new Error("Please edit the product or description")
//         }

    // check if JWT does not return empty user
    try {
        if (!req.user || !req.user.id) {
        //    console.log("req user:", req.user)
        //    console.log("req user Id:", req.user.id)
            res.status(401);
            throw new Error("User not authenticated");
        }

       //Get user using the id in the jwt
        const user = await User.findById(req.user.id)
       //   console.log("user Id:", user)
         if (!user) {
             res.status(401)
            throw new Error("User not found")
   
         }

         // Get ticket by user id
         const ticket = await Ticket.findById(req.params.id)

         // check if ticket is found
         if (!ticket) {
            res.status(404)
            throw new Error("Ticket not found")
         }
         
         // validate only authorized user can get ticket
          if (ticket.user.toString() !== req.user.id) {
             res.status(401)
             throw new Error("Not Authotized")
          }

          //Update ticket
          const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
          if (updateTicket) {
              res.status(200).json(updateTicket)
            
          } else {
            res.status(400)
            throw new Error("Something went wrong")
          }
        
    } catch (error) {
        throw new Error(error.message)
    }
})


export {getTickets, createTicket, getTicket, deleteTicket, updateTicket}