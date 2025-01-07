import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

const postController = {
    createPost: async (req, res) => {
        const { apiKey } = req.query;
        if (typeof apiKey !== 'string') {
            return null;
        }
        if (!apiKey) {
          return res.status(400).json({ error: 'apiKey is required.' });
        }
        const parts = apiKey.split('-');
        const userId = parts[1];
        const email = parts[2];
        const user = await UserModel.findById(userId);
        if (!user || user.email !== email) {
            return null;
        }
        const { content } = req.body;
        if (!content) {
          return res.status(400).json({ error: 'Content is required.' });
        }
        try {
            const newPost = new PostModel({
                userId: user._id,
                content: content,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            await newPost.save();
            res.status(201).json({
                message: 'Post created successfully.',
                post: newPost,
            });
        } catch (err) {
            res.status(500).json({ error: 'An error occurred while creating post.' });
        }
    },
    
    updatePost: async (req, res) => {
        const { apiKey } = req.query;
        if (typeof apiKey !== 'string') {
            return null;
        }
        const parts = apiKey.split('-');
        if (parts.length !== 4) {
            return null;
        }
        const userId = parts[1];
        const email = parts[2];
        const user = await UserModel.findById(userId);
        if (!user || user.email !== email) {
            return null;
        }
        if (!apiKey) {
        return res.status(400).json({ error: 'apiKey is required.' });
        }
        const { id } = req.params;
        const { content } = req.body;
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Content is required.' });
        }
        try {
            const post = await PostModel.findById(id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found.' });
            }
            if (post.userId.toString() !== user._id.toString()) {
                return res.status(403).json({ error: 'You are not authorized to update this post.' });
            }
            post.content = content;
            post.updatedAt = new Date();
            await post.save();
            res.status(200).json({
                message: 'Post updated successfully.',
                post,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while updating the post.' });
        }   
    }
}

export default postController;