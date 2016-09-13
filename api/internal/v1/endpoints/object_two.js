let router = require('express').Router();
let views = require('../views/posting_views');

/**
 * @api {get} /api/internal/v1/postings/:id/predictions/:datetime
 * @apiDescription Request Posting Predictions Whether Is Done
 * @apiParam {Number} id Posting Unique ID
 * @apiParam {DateTime} datetime Prediction Result Datetime
 * @apiName GetPostingPrediction
 * @apiGroup Internal Posting
 */
router.get('/object_twos', views.hello);

/**
 * @api {get} /api/internal/v1/postings/:id/predictions/:datetime
 * @apiDescription Request Posting Predictions Whether Is Done
 * @apiParam {Number} id Posting Unique ID
 * @apiParam {DateTime} datetime Prediction Result Datetime
 * @apiName GetPostingPrediction
 * @apiGroup Internal Posting
 */
router.get('/object_twos/:id/attr/:datetime', views.V1_GET_object_two_attr);

module.exports = router;
