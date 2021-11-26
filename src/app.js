// Imports
const express = require('express')
const app = express()
const path = require('path')

require('dotenv/config')

const connectDB = require('./db')

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

// Routes
app.use('/', require('./routes'))

// Export
module.exports = app