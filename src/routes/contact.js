const express = require('express')

const { contactCreate, contactUpdate, contactGet } = require('../controllers/contact')

const contactRouter = express.Router()

// create route
contactRouter.post('', contactCreate)
// update route
contactRouter.put('', contactUpdate)
// get route
contactRouter.get('', contactGet)

module.exports = contactRouter
