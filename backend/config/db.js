import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold)
        // console.log(`MongoDB URI: ${process.env.MONGO_URI}`.yellow.underline)
    } catch (error) {
        console.log(`Error Connecting: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB