/* global __ROOT_DIR */

let router   = require('express').Router();
let views = require('../views/research_result_view');

/**
 * @api {get} api/v1/postings/
 * @apiName searchJobs
 * @apiGroup postings
 * @apiSuccess (302) {String} Get job results from Elasticsearch
 */
router.get('/postings', views.V1_GET_postings_recent);
router.get('/postings/:id', views.hello);
router.delete('/postings/:id', views.hello);

router.get('/postings/loc/:location/recent', views.hello);

router.post('/postings/search', views.hello);

/**
 * @api {get} api/v1/postings/searchjobs
 * @apiName searchJobs
 * @apiGroup postings
 * @apiSuccess (302) {String} Get job results from Elasticsearch
 */
router.get(`/postings/searchjobs`, views.V1_GET_postings_searchjobs);

module.exports = router;
