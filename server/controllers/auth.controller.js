import User from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js"

export const signup = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return res.status(400).json({ error: "Invalid email format" })

        const existingUser = await User.findOne({ username })
        if (existingUser) return res.status(400).json({ error: "Username is already taken" })

        const existingEmail = await User.findOne({ email })
        if (existingEmail) return res.status(400).json({ error: "Email is already taken" })

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: "Password must be at least 8 characters long and include letters, numbers, and special characters.",
            });
        }

        const newUser = new User({
            fullName,
            username,
            email,
            password
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({ newUser })
        }
        else res.status(400).json({ error: "Invalid user data" })
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username) return res.status(400).json({
            error: true,
            message: "Username is required"
        })

        if (!password) return res.status(400).json({
            error: true,
            message: "Password is required"
        })

        const userInfo = await User.findOne({ username })
        if (!userInfo) return res.status(400).json({
            error: true,
            message: "User not found"
        })

        const isMatch = await userInfo.comparePassword(password)
        if (!isMatch) return res.status(400).json({
            error: true,
            message: "Incorrect Password"
        })

        generateTokenAndSetCookie(userInfo._id, res);

        res.status(201).json({
            error: false,
            message: "Login Successful",
            _id: userInfo._id,
            fullName: userInfo.fullName,
            username: userInfo.username,
            email: userInfo.email,
            followers: userInfo.followers,
            following: userInfo.following,
            profileImg: userInfo.profileImg,
            coverImg: userInfo.coverImg
        })
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = async (_, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout Successfully" })
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}
