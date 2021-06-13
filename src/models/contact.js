const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  freshdesk_id: {
    type: String,
    required: true,
  },
  email: String,
  name: String,
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact