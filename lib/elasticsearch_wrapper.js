/* global __ROOT_DIR */

let elasticsearch       = require('elasticsearch');
let queryBuilder        = require(`${__ROOT_DIR.LIB}/elasticsearch_query_builder`);
let requireFilesFromDir = require(`${__ROOT_DIR.LIB}/require_files_from_dir`);

let hostUrl = `${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT}`;

let config;
if (process.env.ELASTICSEARCH_DEBUG === true) {
  config = {host: hostUrl, log: 'trace',};
} else {
  config = {
    host: hostUrl
  };
}

let sharedClient = new elasticsearch.Client(config);

let wrapper        = {};
const WRAPPER_NAME = 'ELASTICSEARCH_WRAPPER';

let generalError  = new Error();
generalError.name = WRAPPER_NAME;

let prefix = process.env.NODE_ENV;
let mapOfAllIndexes = {
  candidateIndex:  `${prefix}_candidate`.toLowerCase(),
  postingIndex:    `${prefix}_posting`.toLowerCase(),
  predictionIndex: `${prefix}_prediction`.toLowerCase(),
  skillIndex:      `${prefix}_skill`.toLowerCase(),
};

// load all files from ./elasticsearch_wrapper
let absDirPath = `${__dirname}/elasticsearch_wrapper`;
let callback   = function(methodName, requiredFile) {
  wrapper[methodName] = function(params) {
    params._error           = generalError;
    params._sharedClient    = sharedClient;
    params._queryBuilder    = queryBuilder;
    params._mapOfAllIndexes = mapOfAllIndexes;
    return requiredFile(params);
  };
};
requireFilesFromDir({absDirPath, callback});

[
  ['_indexes', mapOfAllIndexes],
  ['_name',    WRAPPER_NAME],
  ['_hostUrl', hostUrl],
].forEach(propTuple => {
  let [propName, propValue] = propTuple;
  Object.defineProperty(wrapper, propName, {
    get: function() {
      return propValue;
    },
  });
});

/**
 * @description This is the elasticsearch wrapper that will wrap the official
 * elasticsearch library
 * @function module:lib/~elasticsearchWrapper
 */
module.exports = wrapper;
