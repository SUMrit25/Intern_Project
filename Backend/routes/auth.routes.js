import express from "express"
import { getMe, login, logout, register } from "../controllers/user.controllers.js";
import { isLoggedin } from "../middleware/authMiddleware.js";


const userRouter = express.Router();
userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/logout", logout)
userRouter.get("/getMe", isLoggedin, getMe)

export default userRouter;