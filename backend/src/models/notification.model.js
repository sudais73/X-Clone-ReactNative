import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
    from: {
        tyoe: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        tyoe: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["follow", "like", "comment"]
    },
    post: {
        tyoe: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: null
    },
    comment: {
        tyoe: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    }
}, { timestamps: true })


const Notification = mongoose.model("Notification", notificationSchema)

export default Notification;