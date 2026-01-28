import { Request, Response } from "express"
import { LoginSchema, SignUpSchema } from "./auth.schema"
import { AuthService } from "./auth.service"
export class AuthController {
  static async Signup(req: Request, res: Response) {


    const data = SignUpSchema.parse(req.body)

    const result = await AuthService.RegisterCompany(
      data.CompanyName,
      data.email,
      data.password,
    )

    res.status(200).json(result)
  }
  static async Login(req: Request, res: Response) {
    const data = LoginSchema.parse(req.body)
    const result = await AuthService.Login(data.email, data.password)
    res.json(result)
  }
}
