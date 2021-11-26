// Imports
const bcryptjs = require('bcryptjs')
const User = require('./../models/User')
const mongoose = require("mongoose")

// Sign Up functions
exports.getSignup = (req, res) => {
    res.render('auth/signup')
}

exports.postSignup = async (req, res) => {
    // Get Data
    const {
        username,
        email,
        password
    } = req.body
    // Regex
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    // Validation
    if (!regex.test(password)) {
        return res.render("auth/signup", {
            msg: "Please include password requirements, 6 chars, 1 number, 1 uppercase and 1 lowecase",
        })
    }

    try {
        // Encrypting
        const salt = await bcryptjs.genSalt(10); // Times of hashing
        const hashed = await bcryptjs.hash(password, salt); // Password Hashed

        // Create user
        const createdUser = await User.create({
            username,
            email,
            password: hashed,
            imgUrl: 'https://es.calcuworld.com/wp-content/uploads/sites/2/2019/09/generador-de-nombres-de-usuario.png'
        })
        // Create session
        req.session.currentUser = {
            _id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email,
            imgUrl: createdUser.imgUrl
        }
        // Redirection
        res.redirect(`/user/${createdUser.username}`)

    } catch (error) {
        // Valid Email
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render('auth/signup', {
                msg: 'Use a valid email.'
            })
            // Validate username
        } else if (error.code === 11000) {
            res.status(500).render('auth/signup', {
                msg: 'Username or email already exists. Try another.'
            })
        }
    }
}

// Login functions
exports.getLogin = (req, res) => {
    res.render('auth/login')
}

exports.postLogin = async (req, res) => {
    // Get Data
    const {
        email,
        password
    } = req.body
    // Find user
    try {
        const findUser = await User.findOne({
            email
        })
        if (!findUser) {
            return res.render('auth/login', {
                msg: 'No coincidences'
            })
        }

        // Check password
        const checkPassword = await bcryptjs.compareSync(password, findUser.password)
        if (!checkPassword) {
            return res.render('auth/login', {
                msg: 'Invalid email or password'
            })
        }
        req.session.currentUser = {
            _id: findUser._id,
            username: findUser.username,
            email: findUser.email,
            imgUrl: findUser.imgUrl
        }
        // Redirection
        res.redirect(`/user/${findUser.username}`)

    } catch (error) {
        console.log(error)
    }
}

// Logout function
exports.postLogout = async (req, res) => {
    res.clearCookie('session-token')
    req.session.destroy(err => err ? console.log(err) : res.redirect('/auth/login'))
}