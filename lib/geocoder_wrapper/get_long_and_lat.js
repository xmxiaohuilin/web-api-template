/* global __ROOT_DIR */

let _     = require('lodash');
let guard = require(`${__ROOT_DIR.LIB}/guard`);

/** Uses google api to get the longitude and latitude of a location
 * @function module:lib/geocoder_wrapper~getLongAndLat
 * @param {Object} params - All parameters wrapped up into an object
 * @param {Object | String} params.location - Address to get longitude and latitude cordinates
 * @param {function} params.callback - Invokes with (err, resp)
 * @param {Object} params._sharedClient - geocode client
 * @param {Object} params._error - wrapper error object
 * @returns {void} Returns nothing
 */
module.exports = function getLongAndLat({
  location,
  _sharedClient,
  _error,
}) {
  guard.mustBePresent({
    error: _error,
    name : 'location',
    test : location,
  });

  if (!_.isString(location)) {
    _error.message = "location must be a string";
    throw _error;
  }

	// Use promises
  return _sharedClient.geocode(location);
};
