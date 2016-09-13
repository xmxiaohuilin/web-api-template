/* global __ROOT_DIR */

let winston = require('winston');
let _ = require('lodash');

let getRequestInfoToLog = require(`${__ROOT_DIR.API_SHARED_POJOS}/get_request_info_to_log.js`);
let filterObjectAttribute = require(`${__ROOT_DIR.LIB}/filter_object_attribute.js`);

const STARLINE = Array(119).join('*');

/**
 * @access public
 * @function module:api/shared/middlewares/~requestLoggerMiddleware
 * @description This middleware logs all the information from an HTTP request using `winston`
 * @param {Object} req - `express.js` request object containing all info about the http request
 * @param {Object} res - `express.js` response object to send responses for the http request
 * @param {function} next - `express.js` middleware chaining method to call middleware stack
 * @returns {void} Returns nothing
 */
module.exports = function requestLoggerMiddleware(req, res, next) {
  let requestInfoToLog = getRequestInfoToLog(req);
  requestInfoToLog = filterObjectAttribute(requestInfoToLog, 'body.password', 'filtered');

  let msg = `HTTP/${req.httpVersion} ${req.method} ${req.url}`;

  if (process.env.IS_DEV_ENV) {
    msg = `${msg}\n`;
  }

  winston.info(msg, requestInfoToLog);
  next();
};
