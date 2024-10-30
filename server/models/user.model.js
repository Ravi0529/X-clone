import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        profileImg: {
            type: String,
            default: "",
        },
        coverImg: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },

        link: {
            type: String,
            default: "",
        },
        likedPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
                default: [],
            },
        ],
    },
    { timestamps: true }
)

// hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
