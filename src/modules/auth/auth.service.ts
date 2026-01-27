import { TenantModel } from "../tenant/tenant.model"
export class AuthService {
  static async RegisterCompany(companyName: string, email: string, password: string) {
    const tenant = await TenantModel.create({ name: companyName })

    const hashed = await bcrypt
  }
}
