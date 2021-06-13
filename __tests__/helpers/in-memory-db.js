const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongodb = new MongoMemoryServer()

const connect = async () => {
  const uri = await mongodb.getUri()

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  await mongoose.connect(uri, options)
}

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongodb.stop()
}

const clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany()
  }
}

module.exports = { connect, closeDatabase, clearDatabase }