import { Router } from "express";
import UserRouter from "./user.router.js";
import PostRouter from "./post.router.js";

const RootRouter = Router();

RootRouter.use('/users', UserRouter);
RootRouter.use('/posts', PostRouter);

export default RootRouter;