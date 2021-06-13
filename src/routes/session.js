const express = require('express')

const User = require('../models/user')
const { SESS_NAME } = require('../config')
const { signInValidator } = require('../validations/user')
const { parseError, sessionizeUser } = require('../utils/helpers')

const sessionRouter = express.Router()

sessionRouter.post('', async (req, res) => {
  try {
    const { email, password } = req.body
    signInValidator.validate({ email, password })

    const user = await User.findOne({ email })

    if (user && user.comparePasswords(password)) {
      const sessionUser = sessionizeUser(user)
      req.session.user = sessionUser
      res.send(sessionUser)
    } else {
      throw new Error('Invalid login credentials')
    }
  } catch (error) {
    res.status(401).send(parseError(error))
  }
})

sessionRouter.delete('', ({ session }, res) => {
  try {
    const user = session.user

    if (user) {
      session.destroy(error => {
        if (error) throw (error)

        res.clearCookie(SESS_NAME)
        res.send(user)
      })
    } else {
      throw new Error('Something went wrong')
    }
  } catch (error) {
    res.status(422).send(parseError(error))
  }
})

sessionRouter.get('', ({ session: { user }}, res) => {
  res.send({ user })
})

module.exports = sessionRouter
