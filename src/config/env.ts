import z from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
