import { Router } from "express";
import postController from "../controllers/post.controller.js";

const PostRouter = Router();

PostRouter.post('/', postController.createPost);
PostRouter.put('/:id', postController.updatePost);

export default PostRouter;