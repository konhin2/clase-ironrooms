// Imports
const express = require('express')
const app = express()
const path = require('path')

require('dotenv/config')

const connectDB = require('./db')

const sessionManager = require("./config/session")

// Middlewares
// Static files
app.use(express.static(path.join(__dirname, 'public')))

// View enige
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// To use req.body insted to use the module body-parser 
app.use(express.urlencoded({ extended: true }))

// Connecting to DB
connectDB()

// Session
sessionManager(app)

// Layout middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser
    next()
})

// Routes
// Users
app.use('/user', require('./routes/usersRoute'))

// Authenticantion and Authorization
app.use('/auth', require('./routes/authRoute'))

// Home
app.use('/', require('./routes'))

// Export
module.exports = app