/* global __ROOT_DIR */

let winston = require('winston');
let jwt     = require('jsonwebtoken');
let User    = require('mongoose').model('User');

let guard = require(`${__ROOT_DIR.LIB}/guard.js`);

/**
 * @access public
 * @function module:api/v1/middlewares/~isLoggedIn
 * @description This middleware is attached to all secured routes to validate the JWT token
 * in the received cookie. It will check the signature of the JWT token and if the IP
 * of the request matches
 * @param {Object} req - `express.js` request object containing all info about the http request
 * @param {Object} res - `express.js` response object to send responses for the http request
 * @param {function} next - `express.js` middleware chaining method to call middleware stack
 * @returns {void} Returns nothing
 */
module.exports = function isLoggedIn(req, res, next) {
  let receivedToken = req.cookies.jwt;
  if (!receivedToken) { return res.sendStatus(401); }

  let payload = jwt.verify(receivedToken, process.env.JWT_SECRET);
  guard.mustBePresent({
    name: "payload.ip",
    test: payload.ip,
  });

  if(payload.ip !== req.ip && payload.ip !== req.connection.remoteAddress) {
    let error = new Error;
    error.name    = "isLoggedIn";
    error.message = "unauthorized user";
    winston.error('unauthorized user', { error: error });
    return res.sendStatus(401);
  }

  User.findOne({_id: payload.id}).exec()
    .then(function(user) {
      if (!user) { res.sendStatus(401); }
      req.user = user;
      next();
    })
    .catch(function(error) {
      winston.error('unauthorized user', { error: error });
      res.sendStatus(401);
    });
};
