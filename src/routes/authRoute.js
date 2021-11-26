// Imports
const router = require('express').Router()

const { 
    getSignup, 
    postSignup, 
    getLogin, 
    postLogin,
    postLogout
} = require('./../controllers/authController')

const { isLoggedIn, isLoggedOut } = require('./../middlewares')

// Routes
// Signup
router.get('/signup',isLoggedOut ,getSignup)
router.post('/signup', postSignup)

// Login
router.get('/login',isLoggedOut ,getLogin)
router.post('/login', postLogin)

// Logout
router.post('/logout', isLoggedIn, postLogout)

// Export
module.exports = router