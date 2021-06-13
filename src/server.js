const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { waitOnConnection } = require('./modules/db')
const sessionAuth = require('./middlewares/session-auth')
const { userRoutes, sessionRoutes, contactRoutes } = require('./routes')
const {
  NODE_ENV,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  MONGO_URI,
} = require('./config')

const createApp = async () => {
  try {
    const app = express()

    app.disable('x-powered-by')

    // set up middlewares
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(session({
      name: SESS_NAME,
      secret: SESS_SECRET,
      saveUninitialized: false,
      resave: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: parseInt(SESS_LIFETIME) / 1000
      }),
      cookie: {
        sameSite: true,
        secure: NODE_ENV === 'production',
        maxAge: parseInt(SESS_LIFETIME)
      }
    }))

    // routes
    const apiRouter = express.Router()
    app.use('/api', apiRouter)
    apiRouter.use('/users', userRoutes)
    apiRouter.use('/session', sessionRoutes)

    // auth routes
    apiRouter.use('/contact', sessionAuth, contactRoutes)

    // database connection
    await waitOnConnection

    return app
  } catch (error) {
    console.log('[Error]', error)
    process.exit(1)
  }
  
}

module.exports = createApp
