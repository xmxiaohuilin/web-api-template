let router = require('express').Router();

/**
 * @api {get} /api/internal/v1/candidates/:id/predictions/:datetime
 * @apiDescription Request Candidate Predictions Whether Is Done
 * @apiParam {Number} id Candidate Unique ID
 * @apiParam {DateTime} datetime Prediction Result Datetime
 * @apiName GetCandidatePrediction
 * @apiGroup Internal Candidate
 */
router.get('/object_one/:id/attr/:datetime', function V1_GET_candidates_prediction(req,res) {
  res.json({hello: 'world;'});
});

module.exports = router;
