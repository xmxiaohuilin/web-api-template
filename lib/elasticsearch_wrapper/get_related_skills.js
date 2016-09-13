/* global __ROOT_DIR */

let winston = require('winston');
let GuardCase = require(`${__ROOT_DIR.LIB}/guard`);

/**
* @function module:lib/elasticsearch_wrapper/~getRelatedSkills
* @description Search elasticsearch for related skills using exactly match skill ids
* @param {Object} params - All the parameters wrapped inside an object
* @param {Array} params.ids - the ids of skills to search that be hashed using md5
* @param {Number} [params.size = 10] - the number of records that will be returned, it defaults to 10
* @param {Error} params._error - an error object passed in by the wrapper
* @param {Object} params._sharedCleint - a shared elasticsearch client passed in by the wrapper
* @param {Object} params._mapOfAllIndexes - elasticsearch index names
* @return {Promise} Returns a promise that will either be resolved with the search response body, or rejected with the error
*/

module.exports = function getRelatedSkills({
  ids,
  size = 10,
  _error,
  _sharedClient,
  _mapOfAllIndexes,
}) {
  GuardCase.mustBePresent({
    error: _error,
    name: 'params.ids',
    test: ids,
  });

  winston.info("elasticsearch get_related_skill: ");

  return _sharedClient.mget({
    index: _mapOfAllIndexes.skillIndex,
    size: size,
    body: {
      ids: ids,
    },
  });
};
