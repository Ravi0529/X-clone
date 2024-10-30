import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import connectMongoDB from "./db/connectMongoDB.js"

const app = express()

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 5000

app.use(express.json()) // it is a middleware for parsing req.body
app.use(express.urlencoded({ extended: true })) // it is a middleware to parse form data

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectMongoDB()
    console.log(`Server is running at port: ${PORT}`)
})
