import { Router } from "express"
import { AuthMiddleware } from "../../middleware/auth.middleware"

import { Authorize } from "../../middleware/rabc.middleware"
import { CustomerController } from "./customer.controller"
const CustomerRouter = Router()

CustomerRouter.post("/", AuthMiddleware, Authorize("admin", "sales"), CustomerController.CreateCustomer)


CustomerRouter.get("/", AuthMiddleware, Authorize("admin", "sales", "support"), CustomerController.ListCustomer)

export default CustomerRouter;
