const nock = require('nock')
const faker = require('faker')

const apiUrl = 'https://api.github.com'

const mockSuccessfulGetUserRequest = (username) => {
  const response = {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.findName(),
  }

  const scope = nock(apiUrl)
    .get(`/users/${username}`)
    .reply(201, response)

  return { response, scope }
}

module.exports = mockSuccessfulGetUserRequest