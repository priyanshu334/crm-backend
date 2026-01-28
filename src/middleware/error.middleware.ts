import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/apiError"
export function ErrorMiddleware(err: any, _req: Request, res: Response, next: NextFunction) {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  console.error(err);
  res.status(500).json({ message: "Internal server error" })
}
