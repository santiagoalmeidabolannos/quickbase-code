const express = require('express')

const User = require('../models/user')
const { signUpValidator } = require('../validations/user')
const { parseError, sessionizeUser } = require('../utils/helpers')

const userRouter = express.Router()

userRouter.post('', async (req, res) => {
  try {
    const { username, email, password } = req.body
    signUpValidator.validate({ username, email, password })

    const newUser = new User({ username, email, password })
    const sessionUser = sessionizeUser(newUser)
    await newUser.save()

    req.session.user = sessionUser
    res.send(sessionUser);
  } catch (error) {
    console.log(error)
    res.status(400).send(parseError(error))
  }
})

module.exports = userRouter