// Imports
const session = require('express-session')
const MongoStore = require('connect-mongo')

// Session Function
const sessionManager = (app) => {
    // a. Secirity and flexibility ante servidores externos (Heroku)
    app.set('trust proxy', 1)

    // Insert Session
    app.use(session({
        secret: process.env.SESSION_SECRET, // Secret word
        resave: true, // Force session
        saveUninitialized: false, // No inicias con cookie
        // Cookie es un archivo que se genera en el servidor con los datos elegidos del usuario, y se crean datos del usuario y se envia al cliente
        cookie: {
            httpOnly: true, // evitar ataques de inyeccion
            maxAge: 1000 * 60 * 60 // Tiempo que dura la session
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI // A que base se guardaran las sessiones
        })
    }))
}

module.exports = sessionManager