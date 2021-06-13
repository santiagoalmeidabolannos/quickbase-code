const Joi = require('joi')

const email = Joi.string().email().required()
const username = Joi.string().alphanum().min(3).max(30).required()
const password = Joi.string().alphanum().required()

const signUpValidator = Joi.object().keys({
  email,
  username,
  password,
})

const signInValidator = Joi.object().keys({
  email,
  password,
})

module.exports = {
  signInValidator,
  signUpValidator,
}