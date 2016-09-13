/* global __ROOT_DIR */
require(`${__ROOT_DIR.TEST_SUPPORT}/_all.js`);

let GuardCase = require(`${__ROOT_DIR.LIB}/guard.js`);
let _ = require('lodash');
let sinon = require('sinon');
let expect = require('expect.js');

describe('GuardCase', function() {
  it('has name as GUARD_CASE', function() {
    expect(GuardCase._name).to.eql('GUARD_CASE');
  });

  it('requires params.test for all of its methods', function() {
    Object.getOwnPropertyNames(GuardCase).forEach(methodName => {
      let method = GuardCase[methodName];
      if (_.isFunction(method)) {
        expect(method).withArgs({}).to.throwException("'params.test' must be present");
      }
    });
  });

  context('.mustBeObjects()', function() {
    let errorMessageRegex = /must be of objects:/;
    let testParams = {a: 1};

    it('throws an error if params.test does not match params.objects', function() {
      expect(GuardCase.mustBeObjects)
        .withArgs({test: testParams, objects: {b: 1}})
        .to.throwException(errorMessageRegex);
    });

    it('passes without throwing an error if params.test matches params.objects', function() {
      expect(GuardCase.mustBeObjects)
        .withArgs({test: testParams, objects: {a: 1}})
        .to.not.throwException();
    });
  });

  context('.mustBePresent()', function() {
    let errorMessageRegex = /must be present/;

    it('throws an error if params.test is not present', function() {
      let test = undefined;
      expect(GuardCase.mustBePresent)
        .withArgs({test})
        .to.throwException(errorMessageRegex);
    });

    it('passes without throwing an error if params.test is present', function() {
      let test = {a: 1};
      expect(GuardCase.mustBePresent)
        .withArgs({test})
        .to.not.throwException();
    });
  });

  context('.mustBeValues()', function() {
    let errorMessageRegex = /must be one of value/;

    it('throws an error if params.test is not one of values in params.values', function() {
      let test = 'ab';
      expect(GuardCase.mustBeValues)
        .withArgs({test: test, values: ['b', 2]})
        .to.throwException(errorMessageRegex);

      test = 1;
      expect(GuardCase.mustBeValues)
        .withArgs({test: test, values: ['b', 2]})
        .to.throwException(errorMessageRegex);
    });

    it('passes without throwing an error if params.test is present', function() {
      let test = 'ab';
      expect(GuardCase.mustBeValues)
        .withArgs({test: test, values: [1, 'ab']})
        .to.not.throwException();

      test = 1;
      expect(GuardCase.mustBeValues)
        .withArgs({test: test, values: ['ab', 1]})
        .to.not.throwException();
    });
  });

  // TEST DELEGATIONS
  [
    ['mustBeObject', {test: {a: 1}, object: {a: 1}}],
    ['mustBeValue',  {test: 1, value: 1}],
  ].forEach(function(methodDataTuple) {
    let [methodName, methodArgs] = methodDataTuple;
    context(`.${methodName}()`, function() {
      let CloneGuardCase = _.cloneDeep(GuardCase); // GuardCase is frozen
      let spy;

      beforeEach(function() {
        spy = sinon.spy(CloneGuardCase, `${methodName}s`);
      });

      afterEach(function() {
        CloneGuardCase[`${methodName}s`].restore();
      });

      it(`delegates calls to .${methodName}s`, function() {
        CloneGuardCase[methodName](methodArgs);
        expect(spy.called).to.be(true);
      });
    });
  });
});
