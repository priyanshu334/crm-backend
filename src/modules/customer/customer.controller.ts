import { AuthRequest } from "../../middleware/auth.middleware";
import { createCustomerSchema } from "./customer.schema";
import { CustomerModel } from "./customer.model";
import { Response } from "express"
export class CustomerController {
  static async CreateCustomer(req: AuthRequest, res: Response) {
    const data = createCustomerSchema.parse(req.body)

    const customer = await CustomerModel.create({
      ...data,
      tenantId: req.user?.tenantId
    })

    res.status(201).json(customer);
  }

  static async ListCustomer(req: AuthRequest, res: Response) {
    const customers = await CustomerModel.find({
      tenantId: req.user?.tenantId
    })
    res.json(customers)
  }
}
