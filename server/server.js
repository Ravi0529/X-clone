import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary"

const app = express()

dotenv.config({
    path: "./.env"
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT || 5000

app.use(express.json()) // it is a middleware for parsing req.body
app.use(express.urlencoded({ extended: true })) // it is a middleware to parse form data
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(PORT, () => {
    connectMongoDB()
    console.log(`Server is running at port: ${PORT}`)
})
