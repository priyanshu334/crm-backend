import { Schema, Types, model } from "mongoose"
export interface User {
  email: string;
  password: string;
  role: "admin" | "sales" | "support";
  tenantId: Types.ObjectId;
}

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "sales", "support"],
      default: "sales",
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    }
  }
  { timestamps: true }
)


export const UserModel = model<User>("User", UserSchema)
