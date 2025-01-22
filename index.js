import cors from "cors"
import dotenv from "dotenv"
import express, { urlencoded } from "express"
import multer from "multer"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use("/public", express.static(process.cwd() + "/public"))
app.use(urlencoded({ extended: false }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/data/uploads")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  },
})

const upload = multer({ storage: storage })

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html")
})

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  const file = req.file

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  })
})

app.listen(port, function () {
  console.log("Your app is listening on port " + port)
})
