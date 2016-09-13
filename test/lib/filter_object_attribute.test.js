/* global __ROOT_DIR */
require(`${__ROOT_DIR.TEST_SUPPORT}/_all.js`);

let expect                = require('expect.js');

let filterObjectAttribute = require(`${__ROOT_DIR.LIB}/filter_object_attribute.js`);

describe('.filterObjectAttribute()', function() {
  it('returns the passed object filtered', function() {
    let testObject = {};
    let attributeToFilter = 'justAnAttribute';
    testObject[attributeToFilter] = 'not filtered yet';

    let filteredValue = 'filteredValue';
    let result = filterObjectAttribute(testObject, attributeToFilter, filteredValue);

    let expectedResult = {};
    expectedResult[attributeToFilter] = filteredValue;

    expect(result).to.eql(expectedResult);
  });

  it('returns the passed object unchanged if filterValue is undefined', function() {
    let testObject = {a: 1};
    let result = filterObjectAttribute(testObject, 'a');
    expect(result).to.eql(testObject);
  });

  context('guards against bad parameters', function() {
    it('returns false if object is not lodash.isObjectLike()', function() {
      let testObject = 'invalid object because it is a string';
      let result = filterObjectAttribute(testObject);
      expect(result).to.be(false);
    });

    it('returns the passed object if fieldToFilter does not exists', function() {
      let testObject = {justAnAttribute: 'any attribute'};
      let result = filterObjectAttribute(testObject, 'attributeDoesNotExist');
      expect(result).to.eql(testObject);
    });
  });
});
