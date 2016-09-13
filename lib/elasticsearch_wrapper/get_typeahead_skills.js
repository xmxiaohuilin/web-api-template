/* global __ROOT_DIR */

let winston = require('winston');
let GuardCase = require(`${__ROOT_DIR.LIB}/guard`);

/**
* @function module:lib/elasticsearch_wrapper/~getTypeaheadSkills
* @description Search elasticsearch for typeahead skills using the prefix of skill
* @param {Object} params - All the parameters wrapped inside an object
* @param {String} params.prefixSkill - the prefix of job title being searched for
* @param {Number} [params.size = 10] - the number of records that will be returned, it defaults to 10
* @param {Error} params._error - an error object passed in by the wrapper
* @param {Object} params._sharedCleint - a shared elasticsearch client passed in by the wrapper
* @param {Object} params._queryBuilder - a shared elasticsearch query builder passed in by the wrapper
* @param {Object} params._mapOfAllIndexes - elasticsearch index names
* @return {Promise} Returns a promise that will either be resolved with the search response body, or rejected with the error
*/

module.exports = function getTypeaheadSkills({
  prefixSkill,
  size = 10,
  _error,
  _sharedClient,
  _queryBuilder,
  _mapOfAllIndexes,
}) {
  GuardCase.mustBePresent({
    error: _error,
    name: 'params.prefixSkill',
    test: prefixSkill,
  });

  winston.info("elasticsearch get_typeahead_skills: ", {prefixSkill});

  let query = _queryBuilder
    .setBase({index: _mapOfAllIndexes.skillIndex, size: size})
    .setPrefix({prefix: {skill: prefixSkill}})
    .generateQuery();

  return _sharedClient.search(query);
};
