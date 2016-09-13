/**
 * @access public
 * @function module:api/v1/endpoints/auth/~setJwtToken
 * @description Create a signed JWT token with payload {id: 'user id', ip: 'request ip'} and set it as the cookie for the HTTP response.
 * @param {Object} req - `express.js` request object containing all info about the http request
 * @param {Object} res - `express.js` response object to send responses for the http request
 * @returns {void} Returns nothing
 */

let jwt = require('jsonwebtoken');

module.exports = function setJwtToken(req, res) {
  let payload = {
    id : req.user._id,
    ip : req.ip || req.connection.remoteAddress,
  };
  let token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: "24d",
    }
  );

  res.cookie(
    'jwt',
    token,
    {
      httpOnly: true,
      expires: new Date(Date.now() + 604800000),
      signed: false,
    }
  );

  res.redirect(`${process.env.WEB_URL}/auth`);
};
