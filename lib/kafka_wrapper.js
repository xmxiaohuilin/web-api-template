/* global __ROOT_DIR */

let kafka = require('kafka-node');
let Producer = kafka.Producer;
let client = new kafka.Client(process.env.ZOOKEEPER_URL);
let producer = new Producer(client);
let requireFilesFromDir = require(`${__ROOT_DIR.LIB}/require_files_from_dir.js`);

let wrapper = {};
const WRAPPER_NAME = "KAFKA_WRAPPER";

let prefix = process.env.KAFKA_TOPIC_PREFIX;

let validTopics = {
  ScorePosting:   `${prefix}score.posting`,
  ScoreCandiadte: `${prefix}score.candidate`,
};

let error = new Error();
error.name = WRAPPER_NAME;

let absDirPath = `${__dirname}/kafka_wrapper`;
let callback = function(methodName, requiredFile) {
  wrapper[methodName] = function(params){
    params._producer = producer;
    params._error = error;
    params._validTopics = validTopics;
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
