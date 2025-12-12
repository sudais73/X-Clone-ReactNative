import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,  // Fixed: was "tyoe"
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,  // Fixed: was "tyoe"
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["follow", "like", "comment"]
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,  // Fixed: was "tyoe"
        ref: "Post",
        default: null
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,  // Fixed: was "tyoe"
        ref: "Comment",
        default: null
    }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;