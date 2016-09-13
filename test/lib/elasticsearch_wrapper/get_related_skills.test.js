/* global __ROOT_DIR */
require(`${__ROOT_DIR.TEST_SUPPORT}/_all.js`);

let expect = require('expect.js');

let getRelatedSkills     = require(`${__ROOT_DIR.LIB}/elasticsearch_wrapper/get_related_skills`);
let elasticsearchWrapper = require(`${__ROOT_DIR.LIB}/elasticsearch_wrapper`);

describe(`.getRelatedSkills()`, function() {
  let _error           = new Error();
  let _mapOfAllIndexes = elasticsearchWrapper._indexes;

  it('is a function', function() {
    expect(getRelatedSkills).to.be.a('function');
  });

  it('calls _sharedClient.mget with the query', function() {
    let _sharedClient = {
      mget: function stubbedSearch(query) {
        return query;
      },
    };

    let input = {
      ids: ['111', '222'],
      _error, _sharedClient, _mapOfAllIndexes,
    };

    let expected = {
      index: _mapOfAllIndexes.skillIndex,
      size: 10,
      body: {
        ids: ['111', '222'],
      },
    };

    expect(getRelatedSkills(input)).to.eql(expected);
  });

  context('guards against bad parameters', function() {
    it('throws error if params.ids is not present', function() {
      let input = {sortOrder: 'asc'};
      let errorMessageRegex = /must be present/;

      expect(getRelatedSkills).withArgs(input).to.throwException(errorMessageRegex);
    });
  });

  xit('TODO: add real tests with local instance or stub the http request');
});
