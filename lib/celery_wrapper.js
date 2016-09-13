/* global __ROOT_DIR */

let celery  = require('node-celery');
let winston = require('winston');

let requireFilesFromDir = require(`${__ROOT_DIR.LIB}/require_files_from_dir`);

let CELERY_CONFIG = {
  CELERY_BROKER_URL: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  CELERY_RESULT_BACKEND: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  CELERY_ROUTES: require('./celery_wrapper/celery_routes.json'),
};

let wrapper = {};

const WRAPPER_NAME = 'CELERY_WRAPPER';

let error = new Error();
error.name = WRAPPER_NAME;

let sharedClient = celery.createClient(CELERY_CONFIG);
sharedClient.setMaxListeners(20);

sharedClient.once('connected', function() {
  winston.info("celery connected: ", CELERY_CONFIG);
});

sharedClient.on('error', function(error) {
  winston.error("celery error: ", {error: error});
});

let celeryRoutes = {
  uploadResume:            'celery_app.upload_resume',
  processJson:             'celery_app.process_json',
  finalizeCandidate:       'celery_app.finalize_candidate',
  runUploadPostingFeature: 'celery_app.run_upload_posting_feature',
};

let absDirPath = `${__dirname}/celery_wrapper`;
let callback   = function(methodName, requiredFile) {
  wrapper[methodName] = function(params) {
    params._sharedClient = sharedClient;
    params._error = error;
    params._celeryRoutes = celeryRoutes;
    parans._wrapper = wrapper;
    
    return requiredFile(params);
  };
};
requireFilesFromDir({absDirPath, callback});

[
  ['_name', WRAPPER_NAME],
  ['_brokerUrl',  CELERY_CONFIG.CELERY_BROKER_URL],
  ['_backendUrl', CELERY_CONFIG.CELERY_RESULT_BACKEND],
  ['_routes', CELERY_CONFIG.CELERY_ROUTES],
].forEach( readOnlyTuple => {
  let [readOnlyName, readOnlyValue] = readOnlyTuple;
  Object.defineProperty(wrapper, readOnlyName, {
    get: function() {
      return readOnlyValue;
    },
  });
});

module.exports = wrapper;
