const faker = require('faker')

const Contact = require('../../../src/models/contact')
const { contactCreate } = require('../../../src/controllers/contact')
const mockSuccessfulGetUserRequest = require('../../mocks/github/mockSuccessfulGetUserRequest')
const mockSuccessfulPostContactRequest = require('../../mocks/freshdesk/mockSuccessfulPostContactRequest')

/** @test {contactCreate} */
describe('contactCreate', () => {
  let user_id
  let username
  let req
  let res
  let jsonMock

  beforeEach(() => {
    jsonMock = jest.fn()
    user_id = faker.datatype.uuid()
    username = faker.internet.userName()
    req = {
      session: {
        user: { 
          userId: user_id,
        }
      },
      body: {
        username,
      }
    }
    res = {
      send: jest.fn(),
      status: jest.fn().mockImplementation(() => ({
        json: jsonMock,
      }))
    }
  })

  test('should throw an error if the contact already exist', async () => {
    const contact = new Contact({
      user_id,
      username,
      freshdesk_id: faker.datatype.uuid(),
      email: faker.internet.email(),
      name: faker.name.findName(),
    })

    await contact.save()

    await contactCreate(req, res)

    expect(jsonMock).toHaveBeenCalledWith({ error: 'Contact already exist' })
  })

  test('should call 3rd party APIs and store the contact info', async () => {
    const { scope: getScope, response } = mockSuccessfulGetUserRequest(username)
    const { scope: postScope, response: postResponse } = mockSuccessfulPostContactRequest()

    await contactCreate(req, res)

    const contact = await Contact.findOne({ username }).exec()

    expect(contact).toMatchObject({
      user_id,
      username,
      email: response.email,
      name: response.name,
      freshdesk_id: postResponse.id,
    })

    expect(getScope.isDone()).toBe(true)
    expect(postScope.isDone()).toBe(true)
  })
})
