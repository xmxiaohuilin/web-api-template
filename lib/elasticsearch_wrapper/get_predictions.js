/* global __ROOT_DIR */

let winston = require('winston');
let GuardCase = require(`${__ROOT_DIR.LIB}/guard`);

/**
* @function module:lib/elasticsearch_wrapper/~getPredictions
* @description Search elasticsearch for prediction using lastGuid
* and the result can be paginated using from and size parameters.
* @param {Object} params - All the parameters wrapped inside an object
* @param {Number} params.lastGuid - the term being searched for
* @param {Number} params.pageNum - the page number, must be positive integer
* @param {Number} [params.size = 10] - the number of records that will be returned, it defaults to 10
* @param {Number} [params.rangeGreaterThan = 0.3] - the big border for the range of prediction score, it defaults to 0.3
* @param {Number} [params.rangeLessThan = 1] - the small border for the range of prediction score, it defaults to 1
* @param {String} [params.sortOrder = 'desc'] - the sort order asc/desc, it defaults to 'desc'
* @param {Error} params._error - an error object passed in by the wrapper
* @param {Object} params._sharedCleint - a shared elasticsearch client passed in by the wrapper
* @param {Object} params._queryBuilder - a shared elasticsearch query builder passed in by the wrapper
* @param {Object} params._mapOfAllIndexes - elasticsearch index names
* @return {Promise} Returns a promise that will either be resolved with the search response body, or rejected with the error
*/

module.exports = function getPredictions({
  lastGuid,
  pageNum,
  size = 10,
  rangeGreaterThan = 0.3,
  rangeLessThan = 1,
  sortOrder = 'desc',
  _error,
  _sharedClient,
  _queryBuilder,
  _mapOfAllIndexes,
}) {
  sortOrder = sortOrder.toLowerCase();
  GuardCase.mustBeValues({
    name: 'params.sortOrder',
    test: sortOrder,
    values: ['asc', 'desc'],
  });

  GuardCase.mustBePresent({
    error: _error,
    name: 'params{lastGuid, pageNum}',
    tests: [lastGuid, pageNum],
  });

  let error = new Error();
  error.message = 'params.pageNum must be positive integer';
  if (!(pageNum % 1 === 0 && pageNum > 0)) {throw error; }

  winston.info("elasticsearch get_prediction: ", {lastGuid});

  let query = _queryBuilder
    .setBase({index: _mapOfAllIndexes.predictionIndex, offsetSize: (pageNum - 1) * size, size: size})
    .setFilter({terms: [{'guid': lastGuid}], ranges: [{'score': {gt: rangeGreaterThan, lt: rangeLessThan}}]})
    .setSort({sorts: [{'score': {'order': sortOrder}}]})
    .generateQuery();

  return _sharedClient.search(query);
};
