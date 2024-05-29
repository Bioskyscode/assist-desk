import express from 'express';
import userRoutes from './routes/userRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import 'colors';
import connectDB from './config/db.js';
import env from 'dotenv';

env.config({path: "./.env"});


//Connect to database
 connectDB()

const app = express()
const PORT = process.env.PORT || 8000

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