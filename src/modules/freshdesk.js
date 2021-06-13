const axios = require('axios')

const { FRESHDESK_TOKEN, FRESHDESK_URL } = require('../config')

const apiUrl = FRESHDESK_URL

/**
 * Creates a contact in freshdesk
 * @param contact Freshdesk contact fields
 * @param contact.name Contact full name
 * @param contact.email Contact email
 * @param contact.twitter_id Contact twitter ID
 * @param contact.unique_external_id External id of the contact
 * @returns Freshdesk contact info
 */
const createContact = async(contact) => {
  return axios({
    method: 'POST',
    url: '/contacts',
    baseURL: apiUrl,
    auth: {
      username: FRESHDESK_TOKEN,
      password: 'X'
    },
    data: contact
  })
}

/**
 * Updates a contact in freshdesk
 * @param id ID of the freshdesk contact
 * @param contact Freshdesk contact fields
 * @param contact.name Contact full name
 * @param contact.email Contact email
 * @param contact.twitter_id Contact twitter ID
 * @param contact.unique_external_id External id of the contact
 * @returns Freshdesk contact info
 */
const updateContact = (id, contact) => {
  return axios({
    method: 'PUT',
    url: `/contacts/${id}`,
    baseURL: apiUrl,
    auth: {
      username: FRESHDESK_TOKEN,
      password: 'X'
    },
    data: contact
  })
}

module.exports = {
  createContact,
  updateContact,
}
