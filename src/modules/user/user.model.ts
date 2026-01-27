import { Types } from "mongoose"
export interface User {
  email: string;
  password: string;
  role: "admin" | "sales" | "support";
  tenantId: Types.ObjectId;
}

