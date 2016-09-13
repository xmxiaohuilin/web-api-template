/* global __ROOT_DIR */
require(`${__ROOT_DIR.TEST_SUPPORT}/_all.js`);

let expect = require('expect.js');

let getTypeaheadSkills   = require(`${__ROOT_DIR.LIB}/elasticsearch_wrapper/get_typeahead_skills`);
let elasticsearchWrapper = require(`${__ROOT_DIR.LIB}/elasticsearch_wrapper`);

describe('.getTypeaheadSkills()', function() {
  let _error           = new Error();
  let _queryBuilder    = require(`${__ROOT_DIR.LIB}/elasticsearch_query_builder`);
  let _mapOfAllIndexes = elasticsearchWrapper._indexes;

  it('is a function', function() {
    expect(getTypeaheadSkills).to.be.a('function');
  });

  it('calls _sharedClient.search with the query generated by queryBuilder', function() {

    let _sharedClient = {
      search: function stubbedSearch(query) {
        return query;
      },
    };

    let input = {
      prefixSkill: 'ja',
      _error, _sharedClient, _queryBuilder, _mapOfAllIndexes,
    };

    let expected = {
      index: _mapOfAllIndexes.skillIndex,
      size: 10,
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

    expect(getTypeaheadSkills(input)).to.eql(expected);
  });

  context('guards against bad parameters', function() {
    it('throws error if params.prefixSkill is not present', function() {
      let errorMessageRegex = /must be present/;

      expect(getTypeaheadSkills).withArgs({}).to.throwException(errorMessageRegex);
    });
  });

  xit('TODO: add real tests with local instance or stub the http request');
});
