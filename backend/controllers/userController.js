import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'


// @desc Register a user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    try {
        //Validate
        if (!name) {
            // res.status(400)
            throw new Error("Please add a name")
        }
        if (!email) {
            // res.status(400)
            throw new Error("Please add an email")
        }
        if (!password) {
            // res.status(400)
            throw new Error("Please add password")
        }
        
        //Find if user already exist
        const userExist = await User.findOne({ email })
        if (userExist) {
            // res.status(400)
            throw new Error("Email already in use")
        }
    
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
    
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
            //return res.status(200).send("Done!")
        } else {
            // res.status(400)
            throw new Error("Invalid user data")
        }
        
    } catch (error) {
        // console.error("ERROR:", error)
        res.status(400).json({message: error.message})
    }

})

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        // const userID = await User.findById(req.user.id)
        // console.log("user Id:", userID)
        if (!user) {
            // res.status(401)
            throw new Error('User not found')
        }
        //Check user and passwords match
        const hashedPassword = user.password
        const isMatch = await bcrypt.compare(password.toString(), hashedPassword.toString());

        if (!isMatch) {
            // res.status(401)
            throw new Error("Invalid Password")
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })

    } catch (error) {
        // console.error("Error:", error);
        res.status(401).json({ message: error.message })
    }


    // try {
    //     const user = await User.findOne({ email })
    //     const hashedPassword = user.password
    //     if (user && (await bcrypt.compare(password.toString(), hashedPassword.toString()))) {
    //         res.status(200).json({
    //             _id: user._id,
    //             name: user.name,
    //             email: user.email,
    //             token: generateToken(user._id),
    //         })
    //     } else {
    //         res.status(401)
    //         throw Error('Invalid credentials')
    //     }
    // } catch (error) {
    //     console.error("Error comparing passwords:", error);
    //     res.status(500).json({ message: error.message });

    // }
})

// @desc Get current user
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
     const user = {
         id: req.user._id,
         email: req.user.email,
         name: req.user.name,
     }
     res.status(200).json(user)
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}


export { registerUser, loginUser, getMe }