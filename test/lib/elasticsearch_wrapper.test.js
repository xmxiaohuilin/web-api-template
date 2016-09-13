/* global __ROOT_DIR */

require(`${__ROOT_DIR.TEST_SUPPORT}/_all.js`);

let expect = require('expect.js');

let ElasticsearchWrapper = require(`${__ROOT_DIR.LIB}/elasticsearch_wrapper`);
let requireFilesFromDir = require(`${__ROOT_DIR.LIB}/require_files_from_dir`);

describe('ElasticsearchWrapper', function() {
  it('loads all methods', function() {
    let absDirPath = `${__ROOT_DIR.LIB}/elasticsearch_wrapper`;
    let callback = function(methodname) {
      expect(ElasticsearchWrapper[methodname]).to.be.a('function');
    };
    requireFilesFromDir({absDirPath, callback});
  });

  context('guards against read only attributes', function() {
    it('cannot overwrite ._name', function() {
      let expected = ElasticsearchWrapper._name;
      let input = 'new assignment';
      ElasticsearchWrapper._name = input;
      expect(ElasticsearchWrapper._name).to.eql(expected);
    });

    it('cannot overwrite ._indexes', function() {
      let expected = ElasticsearchWrapper._indexes;
      let input = 'new assignment';
      ElasticsearchWrapper._indexes = input;
      expect(ElasticsearchWrapper._indexes).to.eql(expected);
    });

    it('cannot overwrite ._hostUrl', function() {
      let expected = ElasticsearchWrapper._hostUrl;
      let input = 'new assignment';
      ElasticsearchWrapper._hostUrl = input;
      expect(ElasticsearchWrapper._hostUrl).to.eql(expected);
    });
  });
});
