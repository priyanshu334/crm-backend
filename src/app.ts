import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"

import { Logger } from "./config/logger"
import AuthRouter from "./modules/auth/auth.routes"

export const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(morgan("combined", {
  stream: {
    write: (message) => Logger.info(message.trim)
  }
}))

app.use("/api/auth", AuthRouter)
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})


