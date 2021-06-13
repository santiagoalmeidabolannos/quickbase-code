const mongoose = require('mongoose')

const { MONGO_URI } = require('../config')

mongoose.connection.on('error', (error) => {
  // TODO: Add proper logger
  console.log('[Error]', error)
})

const uri = MONGO_URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const waitOnConnection = mongoose.connect(uri, options)

module.exports = { waitOnConnection }