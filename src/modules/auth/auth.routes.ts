import { Router } from "express"
import { AuthController } from "./auth.controller"
const AuthRouter = Router()
AuthRouter.post("/signup", AuthController.Signup)
AuthRouter.get("/login", AuthController.Login)


export default AuthRouter
