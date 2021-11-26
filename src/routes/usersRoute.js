// Import
const router = require('express').Router()

const { getProfile } = require('./../controllers/usersController')

const { isLoggedIn } = require('./../middlewares')

// Route
router.get('/:username',isLoggedIn ,getProfile)

// Export
module.exports = router