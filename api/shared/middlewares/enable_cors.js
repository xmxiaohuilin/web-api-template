/**
 * @access public
 * @function module:api/shared/middlewares/~enableCorsMiddleware
 * @description This middleware enables cross origin resource sharing
 * @param {Object} req - `express.js` request object containing all info about the http request
 * @param {Object} res - `express.js` response object to send responses for the http request
 * @param {function} next - `express.js` middleware chaining method to call middleware stack
 * @returns {void} Returns nothing
 */
module.exports = function enableCorsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};
