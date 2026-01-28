import { UserModel } from "../user/user.model"
import { TenantModel } from "../tenant/tenant.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../../utils/apiError"
import { env } from "../../config/env"
export class AuthService {
  static async RegisterCompany(CompanyName: string, email: string, password: string) {
    const exists = await UserModel.findOne({ email: email })

    if (exists) {
      throw new AppError(400, "user already exists")

    }

    const tenant = await TenantModel.create({ name: CompanyName })
    const hashed = await bcrypt.hash(password, 10)


    const user = await UserModel.create({
      email,
      password: hashed,
      role: "admin",
      tenantId: tenant._id,
    })

    const token = jwt.sign({
      userId: user._id,
      tenandId: tenant._id,
      role: user.role

    }, env.JWT_SECTET,
      { expiresIn: "15m" }
    )
    return { token }
  }

  static async Login(email: string, password: string) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new AppError(400, "Invalid user or password")
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new AppError(401, "Invalid email or passoword")
    }
    const token = jwt.sign(
      {
        userId: user._id,
        tenantId: user.tenantId,
        role: user.role,
      },
      env.JWT_SECTET,
      { expiresIn: "15m" }
    )
    return { token }
  }

}
