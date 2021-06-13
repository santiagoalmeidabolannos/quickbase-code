const axios = require('axios')

const { GITHUB_ACCESS_TOKEN } = require('../config')

const apiUrl = 'https://api.github.com'

/**
 * Get user info from Github
 * @param username
 * @returns Promise Github response
 */
const getUserInfo = async (username) => {
  return axios(`${apiUrl}/users/${username}`, { auth: { password: GITHUB_ACCESS_TOKEN } })
}

module.exports = {
  getUserInfo,
}
