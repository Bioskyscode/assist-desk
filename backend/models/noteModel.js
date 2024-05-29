import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Ticket",
    },
    text: {
        type: String,
        required: [true, "Please add some texts"]
    },
    isStaff: {
        type: Boolean,
        required: false 
    },
    staffId: {
        type: String,
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model("Note", noteSchema)