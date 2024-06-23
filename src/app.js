import express from "express"
import morgan from "morgan"
import paymentRoutes from "./routes/paymentRoutes.js"
import { PORT } from "./config.js"
import path from "path"
import { json } from "express"

const app = express()

app.use(json())
app.use(morgan("dev"))

app.use(paymentRoutes)
app.use(express.static(path.resolve("src/public")))

app.listen(PORT)
console.log("Server on port", PORT)