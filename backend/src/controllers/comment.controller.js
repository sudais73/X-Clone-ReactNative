import asyncHandler from 'express-async-handler'
import Comment from '../models/comment.model.js'
import { getAuth } from '@clerk/express'
import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import Notification from '../models/notification.model.js'


export const getComments = asyncHandler(async (req, res) => {

    const { postId } = req.params
    const comments = await Comment.find({ post: postId })
        .sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")
       
        res.status(200).json({ comments })
})

export const createComment = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req)
    const { postId } = req.params
    const { content } = req.body;

    if (!content || content.trim() === "") {
        return res.status(400).json({ error: "comment content is required!" })
    }

    const user = await User.findOne({ clerkId: userId })
    const post = await Post.findById(postId)
    if (!user || !post) {
        return res.status(400).json({ error: "user or post not found" })
    }

    const comment = await Comment.create({
        user: user._id,
        post: postId,
        content,
    })
console.log('====================================');
console.log(userId, postId,content,post, comment);
console.log('====================================');
    // link the comment to the post//

    await Post.findByIdAndUpdate(postId, {
        $push: { comments: comment._id }
    })

    // create the notification if not owner of the post//

    if (post.user.toString() !== user._id.toString()) {
        await Notification.create({
            from: user._id,
            to: post.user,
            type: "comment",
            post: postId,
            comment: comment._id
        })
    }

    res.status(201).json({ comment, msg: "Comment sent" })
})

export const deleteComment = asyncHandler(async(req,res)=>{
    
    const{userId} = getAuth(req);
    const{commentId} = req.params
    const user = await User.findOne({clerkId:userId})
    const comment = await Comment.findById(commentId)

      if (!user || !comment) {
        return res.status(400).json({ error: "user or comment not found" })
    }

if(comment.user.toString() !== user._id.toString()){
    return res.status(403).json({error:"you can only delete your own comment"})
}

// remove comment from //
await Post.findOneAndUpdate(comment.post,
    {$pull:{comments:commentId}}
)
// delete the comment//
await Comment.findByIdAndDelete(commentId)
    res.status(201).json({ comment, msg: "Comment deleted" })

})