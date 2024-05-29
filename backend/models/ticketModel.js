import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    product: {
        type: String,
        required: [true, "Please select a product"],
        enum: ["iPhone", "Macbook", "iMac", "iPad"]
    },
    description: {
        type: String,
        required: [true, "Please describe the issue here"]
    },
    status: {
        type: String,
        required: true,
        enum: ["new", "open", "closed"],
        default: "new"
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model("Ticket", ticketSchema)