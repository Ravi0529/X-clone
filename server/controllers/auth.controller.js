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
            // res.status(201).json({
            //     _id: newUser._id,
            //     fullName: newUser.fullName,
            //     username: newUser.username,
            //     email: newUser.email,
            //     followers: newUser.followers,
            //     following: newUser.following,
            //     profileImg: newUser.profileImg,
            //     coverImg: newUser.coverImg
            // })
        }
        else res.status(400).json({ error: "Invalid user data" })
    }
    catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}