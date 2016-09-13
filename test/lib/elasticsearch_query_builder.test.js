/* global __ROOT_DIR */
require(`${__ROOT_DIR.TEST_SUPPORT}/_all.js`);

let expect = require('expect.js');

let ElasticsearchQueryBuilder = require(`${__ROOT_DIR.LIB}/elasticsearch_query_builder`);

describe('ElasticsearchQueryBuilder', function() {
  afterEach(function(){
    ElasticsearchQueryBuilder.resetQuery();
  });

  context('.setBase()', function() {
    it('populates .searchQuery', function() {
      let input = {
        index: 'dev_prediction',
        type: 'candidates',
        size: 10,
      };

      ElasticsearchQueryBuilder.setBase(input);

      let expected = {
        index: 'dev_prediction',
        type: 'candidates',
        size: 10,
        body: {
          query: {
            filtered : {query: {bool: {}}},
          },
        },
      };

      expect(ElasticsearchQueryBuilder.searchQuery).to.eql(expected);
    });
  });

  context('.setFilter()', function() {
    it('populates .searchQuery', function() {
      let input = {
        terms: [{'guid': '111'}],
        ranges: [{'score': {gt:0.3, lt:1}}],
      };

      ElasticsearchQueryBuilder.setFilter(input);

      let expected = {
        body: {
          query: {
            filtered : {query: {bool: {}},
              filter: {
                bool: {
                  must: [
                    {term: {guid: '111'}},
                    {range: {score: {gt: 0.3, lt: 1}}},
                  ],
                },
              },
            },
          },
        },
      };

      expect(ElasticsearchQueryBuilder.searchQuery).to.eql(expected);
    });
  });

  context('.setMatch()', function() {
    it('populates .searchQuery', function() {
      let input = {
        matches: [{'doc.job_title': 'developer'}],
      };

      ElasticsearchQueryBuilder.setMatch(input);

      let expected = {
        body: {
          query: {
            filtered : {
              query: {
                bool: {
                  must: [
                    {match: {
                      'doc.job_title': 'developer',
                    }},
                  ],
                },
              },
            },
          },
        },
      };

      expect(ElasticsearchQueryBuilder.searchQuery).to.eql(expected);
    });
  });

  context('.setSort()', function() {
    it('populates .searchQuery', function() {
      let input = {
        sorts: [{name: {order: 'asc'}}],
      };

      ElasticsearchQueryBuilder.setSort(input);

      let expected = {
        body: {
          query: {
            filtered : {
              query: {
                bool: {},
              },
            },
          },
          sort: [
            {name: {order: 'asc'}},
          ],
        },
      };

      expect(ElasticsearchQueryBuilder.searchQuery).to.eql(expected);
    });
  });

  context('.setPrefix()', function() {
    it('populates .searchQuery', function() {
      let input = {
        prefix: {skill: 'ja'},
      };

      ElasticsearchQueryBuilder.setPrefix(input);

      let expected = {
        body: {
          query: {
            prefix: {
              skill: 'ja',
            },
            filtered : {
              query: {
                bool: {},
              },
            },
          },
        },
      };

      expect(ElasticsearchQueryBuilder.searchQuery).to.eql(expected);
    });
  });

  context('.resetQuery()', function() {
    it('resets .searchQuery to _baseQuery', function() {
      ElasticsearchQueryBuilder.searchQuery = {};
      ElasticsearchQueryBuilder.resetQuery();

      let expected = ElasticsearchQueryBuilder._baseQuery;

      expect(ElasticsearchQueryBuilder.searchQuery).to.eql(expected);
    });
  });

  context('guards against setBase() is not called in the chain', function() {
    it('throws error if searchQuery.index is not present', function() {
      let errorMessageRegex = /index is not present/;

      expect(ElasticsearchQueryBuilder.generateQuery).to.throwException(errorMessageRegex);
    });
  });

});
