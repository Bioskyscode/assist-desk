import express from 'express';
import userRoutes from './routes/userRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import 'colors';
import env from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors'

// env.config({path: "backend/.env"});
env.config({path: "./.env"});

//Connect to database
connectDB()

const app = express()
const PORT = process.env.PORT || 4000
// console.log("ENVPATH",env.config({path: "./.env"}))
 app.use(cors(
     {
         origin: ["https://assist-desk-app.vercel.app"],
         methods: ["POST", "GET", "PUT", "DELETE"],
         credentials: true
     }
 ));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send("Assist-desk server is running")
})

//Route
app.use("/api/users", userRoutes)
app.use("/api/tickets", ticketRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))