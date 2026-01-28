import { UserModel } from "../user/user.model"
import { TenantModel } from "../tenant/tenant.model"
import bcrypt from "bcrypt"
import { AppError } from "../../utils/apiError";
import jwt from "jsonwebtoken"
import { env } from "../../config/env";
export class AuthService {
  static async RegisterCompany(CompanyName: string, email: string, password: string) {
    const existing = await UserModel.findOne({ email });

    if (existing) {
      throw new AppError(401, "Email already registered ")
    }
    const tenant = await TenantModel.create({ name: CompanyName })
    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      password: hashed,
      role: "admin",
      tenantId: tenant._id,
    })

    const token = jwt.sign({
      userId: user._id,
      tenantId: tenant._id,
      role: user.role,
    },
      env.JWT_SECRET,

      { expiresIn: "15m" }
    )
    return { token }
  }

  static async LoginUser(email: string, password: string) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }
    const valid = bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AppError(401, "Invalid password")
    }

    const token = jwt.sign(
      {
        userId: user._id,
        tenandId: user.tenantId,
        role: user.role,

      },
      env.JWT_SECRET,
      { expiresIn: "15m" }
    )

    return { token }
  }
}

