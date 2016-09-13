/* global __ROOT_DIR */

let pjson = require(`${__ROOT_DIR.ROOT}/package.json`);

/**
 * @access public
 * @description A utility function to get an object with the general information
 * about the web API. It takes the below information from `package.json`:
 *
 * `{"attr": ..., "apiVersions": ... }`
 * @function module:api/shared/pojos/~generateApiInfo
 * @returns {Object} Returns a json with general information about the web API:
 * ```
 * {
 *   "attr":
 *   "status": 'ok',
 *   "code": 200,
 *   "apiVersions": ...,
 * }
 * ```
 */
module.exports = function generateApiInfo() {
  return {
    attr: pjson.author,
	serverVersion: global.__VERSION,
    status: 'ok',
    code: 200,
    apiVersions: pjson.apiVersions,
  };
};
