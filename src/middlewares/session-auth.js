/**
 * Check the session information to authorize requests
 * @param req 
 * @param res 
 * @param next 
 */
function sessionAuth (req, res, next) {
  if (!req.session.user) {
    res.status(401)
  }
  next()
}

module.exports = sessionAuth
