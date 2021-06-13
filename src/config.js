const {
  PORT = 5000,
  NODE_ENV = 'development',
  MONGO_URI = 'mongodb://localhost:27017/test',
  SESS_NAME = 'sid',
  SESS_SECRET = 'secret!session',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,
  GITHUB_ACCESS_TOKEN = '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',
  FRESHDESK_TOKEN = 'UMEIPVqnStDOwZdSKaR',
  FRESHDESK_URL = 'https://newaccount1623145370923.freshdesk.com/api/v2'
} = process.env

module.exports = {
  PORT,
  NODE_ENV,
  MONGO_URI,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  GITHUB_ACCESS_TOKEN,
  FRESHDESK_TOKEN,
  FRESHDESK_URL
}