import { app } from "./app"
import { ConnectTODB } from "./config/db"

async function BootStarp() {
  await ConnectTODB()

  app.listen(3000, () => {
    console.log("server connected")
  })

}

BootStarp()
