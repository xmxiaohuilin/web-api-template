let _ = require('lodash');

let _baseQuery = {
  body: {
    query: {
      filtered : {
        query: {
          bool: {},
        },
      },
    },
  },
};

let ElasticsearchQueryBuilder = {
  /**
   * @member {Object} searchQuery
   * @memberOf module:lib/elasticsearch_query_builder/
   * @property {Object} searchQuery - The default object to set base, filter,
   * match, sort, & prefix search fragement
   */
  searchQuery: _.cloneDeep(_baseQuery),

  /**
   * @function module:lib/elasticsearch_query_builder/~setBase
   * @description Sets index, type, offsetSize, & size of the internal searchQuery object
   * @param {Object} params - All parameters wrapped in an object
   * @param {String} params.index - The name of index
   * @param {String} params.type - The name of type in index
   * @param {Number} params.offsetSize - The offset from the last result
   * @param {Number} [params.size = 10] - The maximum amount of hits to be returned, it defaults to 10
   * @returns {Object} Returns ElasticsearchQueryBuilder
   */
  setBase: function setBase({
    index,
    type,
    offsetSize,
    size = 10,
  }) {
    if (index) {
      this.searchQuery.index = index;
    }
    if (type) {
      this.searchQuery.type = type;
    }
    if (offsetSize) {
      this.searchQuery.from = offsetSize;
    }
    this.searchQuery.size = size;

    return this;
  },

  /**
   * @function module:lib/elasticsearch_query_builder/~setFilter
   * @description Sets boolType, terms, & ranges of the internal searchQuery.body.query.filtered.filter object
   * @param {Object} params - All parameters wrapped in an object
   * @param {String} [params.boolType = 'must'] - The type of bool operation such as 'must', 'should', 'must_not', it defaults to 'must';
   * @param {Object | Array} params.terms - The pair of field and value to filter with term query
   * @param {Object | Array} params.ranges - The pair of field and value to filter with range query
   * @param {Object} params.geoDistance - The distance and geocoded location to filter
   * @returns {Object} Returns ElasticsearchQueryBuilder
   */
  setFilter: function setFilter({
    boolType = 'must',
    terms,
    ranges,
    geoDistance,
  }) {
    let filterFragment = {
      bool: {
        [boolType]: [],
      },
    };

    if (terms) {
      terms = Array.isArray(terms) ? terms : [terms];
      terms.forEach(termFieldAndValue => {
        filterFragment.bool[boolType].push({term: termFieldAndValue});
      });
    }

    if (ranges) {
      ranges = Array.isArray(ranges) ? ranges : [ranges];
      ranges.forEach(rangeFieldAndValue => {
        filterFragment.bool[boolType].push({range: rangeFieldAndValue});
      });
    }

    if (geoDistance) { filterFragment = geoDistance; }

    this.searchQuery.body.query.filtered.filter = filterFragment;

    return this;
  },

  /**
   * @function module:lib/elasticsearch_query_builder/~setMatch
   * @description Sets boolType, & matches of the internal searchQuery.body.query.filtered.query object
   * @param {Object} params - All parameters wrapped in an object
   * @param {String} [params.boolType = 'must'] - The type of bool operation such as 'must', 'should', 'must_not', it defaults to 'must';
   * @param {Object | Array} params.matches - The pair of field and value to match query
   * @returns {Object} Returns ElasticsearchQueryBuilder
   */
  setMatch: function setMatch({
    boolType = 'must',
    matches,
  }) {
    let matchFragment = {[boolType]: []};

    if(matches) {
      matches = Array.isArray(matches) ? matches : [matches];
      matches.forEach(matchFieldAndValue => {
        matchFragment[boolType].push({match: matchFieldAndValue});
      });
    }

    this.searchQuery.body.query.filtered.query.bool = matchFragment;

    return this;
  },

  /**
   * @function module:lib/elasticsearch_query_builder/~setSort
   * @description Sets sorts of the internal searchQuery.body.query.filtered.sort object
   * @param {Object} params - All parameters wrapped in an object
   * @param {Object | Array} params.sorts - The pair of field and order to sort
   * @returns {Object} Returns ElasticsearchQueryBuilder
   */
  setSort: function setSort({
    sorts,
  }) {
    let sortFragment = [];

    if(sorts) {
      sorts = Array.isArray(sorts) ? sorts : [sorts];
      sorts.forEach(sortFieldAndOrder => {
        sortFragment.push(sortFieldAndOrder);
      });
    }

    this.searchQuery.body.sort = sortFragment;

    return this;
  },

  /**
   * @function module:lib/elasticsearch_query_builder/~setPrefix
   * @description Sets prefix of the internal searchQuery.body.query.prefix object
   * @param {Object} params - All parameters wrapped in an object
   * @param {Object} params.prefix - The pair of field and value to prefix query
   * @returns {Object} Returns ElasticsearchQueryBuilder
   */
  setPrefix: function setPrefix({
    prefix,
  }) {
    this.searchQuery.body.query.prefix = prefix;

    return this;
  },

  /**
   * @function module:lib/elasticsearch_query_builder/~resetQuery
   * @description Resets the searchQuery to base query
   * @returns {Object} Returns ElasticsearchQueryBuilder
   */
  resetQuery: function resetQuery() {
    this.searchQuery = _.cloneDeep(_baseQuery);

    return this;
  },

  /**
   * @function module:lib/elasticsearch_query_builder/~generateQuery
   * @description Generates the search query and resets the searchQuery to base query
   * @returns {Object} Returns search query
   */
  generateQuery: function generateQuery() {
    let obj = this.searchQuery;

    let error = new Error();
    error.message = 'searchQuery.index is not present (make sure to use .setBase())';
    //this implicitly guards that setBase needs to be called in the chain because it's the only one that sets 'index'
    if(!_.has(this.searchQuery, 'index')) {
      throw error;
    }

    this.resetQuery();

    return obj;
  },
};

Object.defineProperty(ElasticsearchQueryBuilder, '_baseQuery', {
  get: function() {
    return _baseQuery;
  },
});

module.exports = ElasticsearchQueryBuilder;
