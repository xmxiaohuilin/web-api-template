/* global __ROOT_DIR */

let express = require('express');
let app = express();

//==============================================================================
// Remove some express app settings for security
app.disable('x-powered-by');

//==============================================================================
// Load all shared external packages
app.use(require('body-parser').json());
app.use(require('cookie-parser')(process.env.COOKIE_SECRET));

//==============================================================================
// Load all shared middlewares first. Order matters.
//
[
  `${__ROOT_DIR.API_SHARED_MIDDLEWARES}/request_logger.js`,
  `${__ROOT_DIR.API_SHARED_MIDDLEWARES}/enable_cors.js`,
].forEach(sharedMiddleware => {
  app.use(require(sharedMiddleware));
});

//==============================================================================
// Load all mongoose schemas
[
  `${__ROOT_DIR.API_SHARED_INITIALIZERS}/schemas/user.js`,
  `${__ROOT_DIR.API_SHARED_INITIALIZERS}/schemas/web_json.js`,
].forEach(schema => {
  require(schema);
});

//==============================================================================
// Set these root URIs to return a json with general info about the API
//   ├── '/'
//   ├── '/api'
//   └── '/api/v1'
let generateApiInfoJson = require(`${__ROOT_DIR.API_SHARED_POJOS}/generate_api_info.js`);
function returnApiInfoJson(req, res) {
  let apiInfoJson = generateApiInfoJson();
  apiInfoJson.currentRoute = req.route.path;
  res.json(apiInfoJson);
}

app.get('/', returnApiInfoJson);
app.get('/api', returnApiInfoJson);
app.get('/api/v1', returnApiInfoJson);
app.get('/api/internal/v1', returnApiInfoJson);

// Load all v1 packages
[
  `${__ROOT_DIR.API_V1_INITIALIZERS}/passport.js`,
].forEach(v1_initializer => {
  require(v1_initializer);
});

//==============================================================================
// Load all endpoints for v1
[
  `${__ROOT_DIR.API_V1_ENDPOINTS}/auth.js`,
  `${__ROOT_DIR.API_V1_ENDPOINTS}/users.js`,
  `${__ROOT_DIR.API_V1_ENDPOINTS}/postings.js`,
].forEach(v1_endpoint => {
  app.use('/api/v1', require(v1_endpoint));
});

//==============================================================================
// Load all endpoints for internal v1
[
  `${__ROOT_DIR.API_INTERNAL_V1_ENDPOINTS}/candidates.js`,
  `${__ROOT_DIR.API_INTERNAL_V1_ENDPOINTS}/postings.js`,
].forEach(internal_v1_endpoint => {
  app.use('/api/internal/v1', require(internal_v1_endpoint));
});

/**
 * @access public
 * @description This is our `express.js` node server that will load all of our
 *              endpoints and middlewares. We will handle all of the loading
 *              order here in this file.
 * @function module:api/~server
 * @return {express.app} Returns the express app with all the loaded endpoints
 *                       and middleware
 */
module.exports = app;
