import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { env } from "../config/env";
import { AppError } from "../utils/apiError";
export interface AuthRequest extends Request {
  user?: {
    userId: string;
    tenantId: string;
    role: "admin" | "sales" | "support";
  }


}

export function AuthMiddleware(req: AuthRequest, res: Response, next: NextFunction) {

  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError(401, "unauthroized")

  }
  const token = header.split(" ")[1];
  try {
    const decode = jwt.verify(token, env.JWT_SECRET) as AuthRequest["user"];

    req.user = decode;
    next();
  } catch (err) {
    throw new AppError(401, "invalid token")
  }
}
