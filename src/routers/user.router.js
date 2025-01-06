import { Router } from "express";
import userController from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post('/register', userController.createUser);
UserRouter.post('/login', userController.loginUser);
// UserRouter.get('/:id', userController.getUserById);

export default UserRouter;