/* global __ROOT_DIR */
let requireFilesFromDir = require(`${__ROOT_DIR.LIB}/require_files_from_dir`);
let geocoder = require('node-geocoder');

let _sharedClient = geocoder(
  {
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null,
  }
);

let wrapper = {};

const WRAPPER_NAME = "GEOCODER_WRAPPER";
let error = new Error();
error.name = WRAPPER_NAME;



let absDirPath = `${__dirname}/geocoder_wrapper`;
let callback = function(methodName, requiredFile) {
  wrapper[methodName] = function(params) {
    params._sharedClient = _sharedClient;
    params._error        = error;
    return requiredFile(params);
  };
};
requireFilesFromDir({absDirPath, callback});

[
  ['_name', WRAPPER_NAME],
].forEach( readOnlyTuple => {
  let [readOnlyName, readOnlyValue] = readOnlyTuple;
  Object.defineProperty(wrapper, readOnlyName, {
    get: function() {
      return readOnlyValue;
    },
  });
});

module.exports = wrapper;
