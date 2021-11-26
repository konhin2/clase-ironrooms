// Import
const { model, Schema } = require('mongoose')

// Schema
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required.'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Use a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    imgUrl: String
}, {timestamps: true})

// Model
const User = model('User', userSchema)

// Export
module.exports = User