let fs = require('fs');
let _ = require('lodash');

/**
 * @access public
 * @description This is a utility function that will load all the file names from
 * an absolute dir path, requires the file, and sends the (filename, requiredFile)
 * to the callback.
 * @function module:lib/~requireFilesFromDir
 * @param {boolean} [stripExtension = true] - Default to `true`. Strip the extension away from the filename.
 * @param {boolean} [camelCaseFileName = true] - Default to `true`. Camelcase the filename.
 * @param {boolean} [ignoreJson = false] - Default to `false`. Ignore .json file.
 * @param {String} absDirPath - Absolute path to the folder contain the files
 * @param {function} callback - A callback function(transformedFilename, require(filePath))
 * that will be passed the filename in camelCase and the function that the file exports
 * @returns {void} Returns nothing
 */
module.exports = function requireFilesFromDir({
  camelCaseFileName = true,
  stripExtension = true,
  ignoreJson = false,
  absDirPath,
  callback,
}) {
  if (!_.isFunction(callback)) {
    throw new Error('params.callback is required and must be a function(filename, requiredFile)');
  }

  if (!_.isString(absDirPath)) {
    throw new Error('params.absDirPath is required and must be a String');
  }

  fs.readdirSync(absDirPath).forEach(filename => {
    let firstCharacter = filename[0];
    if (firstCharacter === '_' || firstCharacter === '.') { return; }

    let filenameIsJson = filename.match(/\.json$/);
    if (ignoreJson && filenameIsJson) { return; }

    let filenameIsJs = filename.match(/\.js$/);
    if (!filenameIsJson && !filenameIsJs) { return; }

    let transformedFilename = filename;
    if (stripExtension) { transformedFilename = filename.replace(/\..+/, ''); }
    if (camelCaseFileName) { transformedFilename = _.camelCase(transformedFilename); }

    callback(transformedFilename, require(`${absDirPath}/${filename}`));
  });
};
