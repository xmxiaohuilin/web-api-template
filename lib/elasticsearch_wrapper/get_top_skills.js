/* global __ROOT_DIR */

let winston = require('winston');
let GuardCase = require(`${__ROOT_DIR.LIB}/guard`);

/**
* @function module:lib/elasticsearch_wrapper/~getTopSkills
* @description Search elasticsearch for top skills using job title as the keyword
* @param {Object} params - All the parameters wrapped inside an object
* @param {String} params.jobTitle - the job title being searched for
* @param {Number} [params.size= 10] - the number of records that will be returned, it defaults to 10
* @param {Error} params._error - an error object passed in by the wrapper
* @param {Object} params._sharedCleint - a shared elasticsearch client passed in by the wrapper
* @param {Object} params._queryBuilder - a shared elasticsearch query builder passed in by the wrapper
* @param {Object} params._mapOfAllIndexes - elasticsearch index names
* @return {Promise} Returns a promise that will either be resolved with the search response body, or rejected with the error
*/

module.exports = function getTopSkills({
  jobTitle,
  size = 10,
  _error,
  _sharedClient,
  _queryBuilder,
  _mapOfAllIndexes,
}) {
  GuardCase.mustBePresent({
    error: _error,
    name: 'params.jobTitle',
    test: jobTitle,
  });

  winston.info("elasticsearch get_top_skills: ", {jobTitle});

  let query = _queryBuilder
    .setBase({index: _mapOfAllIndexes.candidateIndex, size: size})
    .setMatch({matches: [{'latest_experience.jobTitle': jobTitle}]})
    .generateQuery();

  return _sharedClient.search(query);
};
