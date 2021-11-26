// Import
const mongoose = require('mongoose')

// Function to connect MongoDB
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
		useUnifiedTopology: true
    })
    console.log('Connected to DataBase')
}

// Export 
module.exports = connectDB