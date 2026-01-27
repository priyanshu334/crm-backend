import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import { stream } from "winston"
import { Logger } from "./config/logger"

export const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use(morgan("combined", {
  stream: {
    write: (message) => Logger.info(message.trim)
  }
}))

app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})



