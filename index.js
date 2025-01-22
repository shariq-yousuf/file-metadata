import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use("/public", express.static(process.cwd() + "/public"))

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html")
})

app.listen(port, function () {
  console.log("Your app is listening on port " + port)
})
