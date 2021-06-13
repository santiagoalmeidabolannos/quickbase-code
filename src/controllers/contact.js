const Joi = require('joi')
const faker = require('faker')

const github = require('../modules/github')
const Contact = require('../models/contact')
const freshdesk = require('../modules/freshdesk')

const usernameValidator = Joi.string().required()

const contactCreate = async (req, res) => {
  try {
    const { userId } = req.session.user
    const { username } = req.body
    usernameValidator.validate(username)

    const dbContact = await Contact.findOne({ username }).exec()

    if (dbContact) {
      return res.status(400).json({ error: 'Contact already exist' })
    }

    // get user info from github
    let { id, email, name } = (await github.getUserInfo(username)).data

    const contact = getFreshdeskContact(id, name, email)

    // create contact on freshdesk
    const { id: freshdesk_id } = (await freshdesk.createContact(contact)).data

    // create local contact with combined data
    const newContact = new Contact({
      username,
      email,
      name,
      user_id: userId,
      freshdesk_id,
    })
    await newContact.save()

    res.send(newContact)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

const contactUpdate = async (req, res) => {
  try {
    const { username } = req.body
    usernameValidator.validate(username)

    // search for the user in the database
    const dbContact = await Contact.findOne({ username }).exec()
    if (!dbContact) {
      return res.status(400).json({ error: `There is no contact with username: ${username}` })
    }

    // get user info from github
    const { id, email, name } = (await github.getUserInfo(username)).data

    const contact = getFreshdeskContact(id, name, email)

    // update the user info on freshdesk
    await freshdesk.updateContact(dbContact.freshdesk_id, contact)

    // update database contact
    dbContact.email = contact.email
    dbContact.name = contact.name

    await dbContact.save()

    res.send(dbContact)
  } catch (error) {
    res.send(error)
  }
}

const contactGet = async (req, res) => {
  try {
    const list = await Contact.find({}).exec()

    res.send(list)
  } catch (error) {
    res.send(error)
  }
}

const getFreshdeskContact = (id, name, email) => {
  // populate null fields to complaint with freshdesk api
  if (email === null) {
    email = faker.internet.email()
  }
  if (name === null) {
    name = faker.name.findName()
  }

  return { unique_external_id: id.toString(), name, email }
}

module.exports = {
  contactCreate,
  contactUpdate,
  contactGet,
}