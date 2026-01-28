import mongoose, { Schema, Types, model } from "mongoose";

export interface Customer {
  tenantId: Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
}

const CustomerSchema = new Schema<Customer>(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String
    }
  }
)

export const CustomerModel = model<Customer>("Customer", CustomerSchema)
