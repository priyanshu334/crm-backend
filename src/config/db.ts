import mongoose from "mongoose";
import { env } from "./env";
import { Logger } from "./logger";


export async function ConnectTODB() {
  try {
    mongoose.set("strictQuery", true),
      await mongoose.connect(env.MONGO_URI)
    Logger.info("MongoDB connected")
  }
  catch (err) {
    Logger.error("MongoDB connection failed", err)
    process.exit(1)

  }
}
