const nock = require('nock')
const faker = require('faker')

const { FRESHDESK_URL } = require('../../../src/config')

const apiUrl = 'https://api.github.com'

const mockSuccessfulPostContactRequest = () => {
  const response = {
    id: faker.datatype.uuid(),
  }

  const scope = nock(FRESHDESK_URL)
    .post('/contacts')
    .reply(201, response)

  return { response, scope }
}

module.exports = mockSuccessfulPostContactRequest