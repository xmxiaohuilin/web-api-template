let _ = require('lodash');

/**
 * @access public
 * @function module:api/shared/pojos/~getRequestInfoToLog
 * @description A filtering function to filter `express.js` HTTP request object for
 *              information that we want to log: `ip`, `headers`, `body`, `params`, & `query`.
 *
 * ##### Guard Cases:
 *
 * 1. Returns `{}` if `req` is __NOT__ `_.isObjectLike(object)` or is `undefined`
 * @param {Object} req - `express.js` request object containing all info about the http request
 * @returns {Object} A new object with all of the properties from `express.js` HTTP
 *                  request that we want to log
 */
module.exports = function getRequestInfoToLog(req) {
  let reqIsNotPresent = _.isUndefined(req) || !_.isObjectLike(req);
  if (reqIsNotPresent) { return {}; }

  let requestInfoToLog = {};
  [
    'ip',
    'headers',
    'body',
    'params',
    'query',
  ].forEach(field => {
    let fieldToLog = _.get(req, field);
    if (fieldToLog && !_.isEmpty(fieldToLog)) { requestInfoToLog[field] = fieldToLog; }
  });

  return requestInfoToLog;
};
