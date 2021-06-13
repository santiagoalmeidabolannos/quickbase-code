const InMemoryDb = require('./helpers/in-memory-db')

beforeAll(async () => await InMemoryDb.connect())
afterEach(async () => await InMemoryDb.clearDatabase())
afterAll(async () => await InMemoryDb.closeDatabase())
