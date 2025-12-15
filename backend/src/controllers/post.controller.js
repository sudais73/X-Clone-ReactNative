import asyncHandler from 'express-async-handler'
import Post from '../models/post.model.js'
import User from '../models/user.model.js';
import { getAuth } from '@clerk/express';
import cloudinary from '../config/cloudinary.js';
import Notification from '../models/notification.model.js';
import Comment from '../models/comment.model.js';

export const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName profilePicture"
            }
        });
    res.status(200).json({ posts })
})

export const getSinglePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId)
    sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName profilePicture"
            }
        });

    if (!post) {
        return res.status(404).json({ error: "Pot not found" })
    }
    res.status(200).json({ post })
})


export const getUserPosts = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findById(username)

    if (!user) {
        return res.status(404).json({ error: "user not found" })
    }
    const posts = await Post.find({ user: user._id })
    sort({ createdAt: -1 })
        .populate("user", "username firstName lastName profilePicture")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName profilePicture"
            }
        });

    if (!posts) {
        return res.status(404).json({ error: "Pot not found" })
    }
    res.status(200).json({ posts })
})

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req)
  const { content } = req.body
  const image = req.file

  if (!content && !image) {
    return res.status(400).json({ error: "Post must contain text or image" })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }

  let imageUrl = ""

  if (image) {
    try {
      const base64Image = `data:${image.mimetype};base64,${image.buffer.toString(
        "base64"
      )}`

      const response = await cloudinary.uploader.upload(base64Image, {
        folder: "X_clone_post",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      })

      imageUrl = response.secure_url
    } catch (error) {
      console.error("Cloudinary upload error:", error)
      return res.status(400).json({ error: "Failed to upload image" })
    }
  }

  const post = await Post.create({
    user: user._id,
    content: content || "",
    image: imageUrl,
  })

  res.status(201).json({ post, msg: "Post created successfully" })
})

export const likePost = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { postId } = req.params;
    const user = await User.findById(userId)
    const post = await Post.findById(postId)
    if (!post || !user) {
        return res.status(404).json({ error: "Pot or user not found" })
    }

    const isLiked = Post.likes.includes(user._id)

    if (isLiked) {
        //unlike
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: user._id }
        });
    } else {
        await Post.findByIdAndUpdate(postId, {
            $push: { likes: user._id }
        });

        // create notification if not owner of the post

        if (post.user.toString() !== user._id.toString()) {
            await Notification.create({
                from: user._id,
                to: post.user,
                type: "like",
                post: postId,
            })
        }



    }
    res.status(200).json({
        msg: isLiked ? "Post Unliked" : "Post liked"
    })


})

export const deletePost = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { postId } = req.params;
    const user = await User.findById(userId)
    const post = await Post.findById(postId)


    if (!post || !user) {
        return res.status(404).json({ error: "Pot or user not found" })
    }

    if (post.user.toString() !== user._id.toString()) {
        res.status(403).json({ error: "You can only delete your own post" })
    }

    // delete the comments first//

    await Comment.deleteMany({ post: postId })

    //delete post//

    await Post.findByIdAndDelete(postId)

    res.status(200).json({ msg: "Post deleted successfully" })

})