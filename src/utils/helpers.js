/**
 * Parse errors to extract details
 * @param error 
 */
const parseError = (error) => {
  if (error.isJoi) return error.details[0]
  return JSON.stringify(error, Object.getOwnPropertyNames(error))
}

/** 
 * Return the user information for a session
 * @param user
 * @param user.id Unique ID of the user
 * @param user.username Unique username for the user
 */
const sessionizeUser = (user) => {
  return { userId: user.id, username: user.username }
}

module.exports = {
  parseError,
  sessionizeUser,
}