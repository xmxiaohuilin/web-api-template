let _ = require('lodash');
const GUARD_CASE_NAME = 'GUARD_CASE';

function guardForTestPresence(test) {
  if (!test) {
    let error = new Error("'params.test' must be present");
    error.name = GUARD_CASE_NAME;
    throw error;
  }
}

function wrapErrorNameWithGuardCase(error) {
  if (error.name) {
    error.name = `${error.name}(${GUARD_CASE_NAME})`;
  } else {
    error.name = GUARD_CASE_NAME;
  }
}

let GuardCase = {
  _name: GUARD_CASE_NAME,

  /**
   * @function module:lib/~mustBeObjects
   * @description Test to see if params.test is `_.isEqual()` to one of the objects
   * inside `params.objects`. If the guard case failed, the `params.error` will
   * be thrown. Otherwise, the guard case will pass silently and not throw an error.
   * @param {object} params - All parameters wrapped in an object
   * @param {Error} params.error - An Error object that will be thrown
   * @param {String} params.name - The name of the variable being tested
   * @param {Array} params.objects - The single object or an array of objects to be tested against `params.test`
   * @param {*} params.test - The variable object to be tested against objects
   * @returns {void} Returns nothing, but it will throw an error if the guard case fails.
   */
  mustBeObjects: function mustBeObjects(
    {
      error   = new Error,
      name    = '',
      objects = [],
      test,
    }
  ) {
    guardForTestPresence(test);
    wrapErrorNameWithGuardCase(error);

    if (!_.isArray(objects)) {objects = [objects];}

    let objectsString = [];
    let guardCaseFailed = false;
    objects.forEach(object => {
      objectsString.push(JSON.stringify(object));
      if (!_.isEqual(test, object)) {guardCaseFailed = true;}
    });

    if (guardCaseFailed) {
      error.message = `${name} must be of objects: ${objects.join(', ')}`;
      throw error;
    }
  },

  /**
   * @function module:lib/~mustBePresent
   * @description Test to see if params.test is present and not `null` or `undefined`.
   * If the guard case failed, the `params.error` will be thrown. Otherwise,
   * the guard case will pass silently and not throw an error.
   * @param {object} params - All parameters wrapped in an object.
   * @param {Error} params.error - An Error object that will be thrown
   * @param {String} params.name - The name of the variable being tested
   * @param {*} params.test- The variables to test if present and not undefined.
   * __Mutually exclusive with `params.test`__. `params.test` will override `params.tests`.
   * @param {Array} params.tests - An array of variables to test if present and not undefined.
   * __Mutually exclusive with `params.tests`__. `params.test` will override `params.tests`.
   * @returns {void} Returns nothing, but it will throw an error if the guard case fails.
   */
  mustBePresent: function(
    {
      error   = new Error,
      name    = '',
      test,
      tests,
    }
  ) {
    test = test || tests;
    guardForTestPresence(test);
    wrapErrorNameWithGuardCase(error);

    if (!_.isArray(test)) {test = [test];}
    let guardCaseFailed = false;
    test.forEach(test => {
      if (!test) {guardCaseFailed = true;}
    });

    if (guardCaseFailed) {
      error.message = `${name} must be present`;
      throw error;
    }
  },

  /**
   * @function module:lib/~mustBeValues
   * @description Test to see if params.test is `===` or `==` to one of the values
   * inside `params.values`. If the guard case failed, the `params.error` will
   * be thrown. Otherwise, the guard case will pass silently and not throw an error.
   * @param {object} params - All parameters wrapped in an object.
   * @param {Error} params.error - An Error object that will be thrown
   * @param {String} params.name - The name of the variable being tested
   * @param {boolean} params.strictComparison - `true` to use `===` and `false` to use `==`. The operator will be used for comparison.
   * @param {*} params.test - The variables to test if present and not undefined
   * @param {Array} params.values - All the values to compare to `params.test`
   * @returns {void} Returns nothing, but it will throw an error if the guard case fails.
   */
  mustBeValues: function(
    {
      error  = new Error,
      name   = '',
      strictComparison = true,
      test,
      values = [],
    }
  ) {
    guardForTestPresence(test);
    wrapErrorNameWithGuardCase(error);

    if (!_.isArray(values)) {values = [values];}

    let equalityOperator;
    if (strictComparison) {
      equalityOperator = function(a, b) {
        return a === b;
      };
    } else {
      equalityOperator = function(a, b) {
        return a == b;
      };
    }

    let guardCaseFailed = true;
    values.forEach(value => {
      let valueIsEqual = equalityOperator(test, value);
      if (valueIsEqual) {guardCaseFailed = false;}
    });

    if (guardCaseFailed) {
      error.message = `${name} must be one of value: ${values.join(', ')}`;
      throw error;
    }
  },

  /**
   * @function module:lib/~mustBeValue
   * @description This function delegates to [GuardCase.mustBeValues]({@link module:lib/~mustBeValues})
   * @returns {void} Returns nothing, but it will throw an error if the guard case fails.
   */
  mustBeValue: function(
    {
      error  = new Error,
      name   = '',
      strictComparison = true,
      test,
      value = [],
    }
  ) {
    this.mustBeValues({error, name, strictComparison, test, values: value});
  },

  /**
   * @function module:lib/~mustBeObject
   * @description This function delegates to [GuardCase.mustBeValues]({@link module:lib/~mustBeObject})
   * @returns {void} Returns nothing, but it will throw an error if the guard case fails.
   */
  mustBeObject: function(
    {
      error   = (new Error),
      name    = '',
      object  = [],
      test,
    }
  ) {
    this.mustBeObjects({error, name, test, objects: object});
  },
};

Object.freeze(GuardCase);

module.exports = GuardCase;
