import z from "zod";

export const SignUpSchema = z.object({
  CompanyName: z.string(),
  email: z.string(),
  password: z.string(),
})

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string()

})
