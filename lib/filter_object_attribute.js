let _ = require('lodash');

/**
 * @access public
 * @description This is a utility function that will replace an Object's
 * property with the filtered value
 *
 * ##### Guard Cases:
 *
 * 1. Returns `false` if `object` is __NOT__ `_.isObjectLike(object)`
 * 2. Returns `object` if `attributeToFilter` is not found or `filterValue` is
 *   `undefined`
 * @function module:lib/~filterObjectAttribute
 * @param {Object} object - object to be filtered
 * @param {String | Array} attributeToFilter - path of property to filter
 * @param {*} filterValue - value to replace attributeToFilter
 * @returns {false | Object} Returns the passed `object` with its `attributeToFilter`
 * replaced with the `filterValue`
 */
module.exports = function filterObjectAttribute(object, attributeToFilter, filterValue) {
  if (!_.isObjectLike(object)) { return false; }

  let valueOfAttributeToFilter = _.get(object, attributeToFilter);
  if (_.isUndefined(valueOfAttributeToFilter)) { return object; }
  if (_.isUndefined(filterValue)) { return object; }

  return _.set(object, attributeToFilter, filterValue);
};
