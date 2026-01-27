import mongoose, { Schema, Types, model } from "mongoose";

export interface Tenant {
  _id: Types.ObjectId;
  name: string;
  plan: "free" | "pro" | "enterprise";
  createdAt: Date;
}


const TenantSchema = new Schema<Tenant>(
  {
    name: {
      type: String,
      required: true
    },
    plan: {
      tyep: String,
      enum: ["free", "pro", "enterprise"]
      ,
      default: "free"
    },

  },
  { timestamps: true }
)

export const TenantModel = model<Tenant>("Tenant", TenantSchema);
