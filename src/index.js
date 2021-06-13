const createApp = require('./server')
const { PORT } = require('./config')

async function main () {
  try {
    const app = await createApp()
    await app.listen(PORT)
    
    console.log('App listening on port', PORT)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = main()