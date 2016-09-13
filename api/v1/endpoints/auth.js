let router   = require('express').Router();
let passport = require('passport');

let V1_SET_JWT_token = require('./auth/set_jwt_token');

/**
 * @api {get} api/v1/auth/facebook
 * @apiName authFacebook
 * @apiGroup auth
 * @apiSuccess (302) {String} log into facebook
 */
router.get(
  `/auth/facebook`,
  passport.authenticate('v1_facebook', {session: false})
);

router.get(
  `/auth/facebook/callback`,
  passport.authenticate('v1_facebook', {session: false}),
  V1_SET_JWT_token
);

/**
 * @api {get} api/v1/auth/linkedin
 * @apiName authLinkedin
 * @apiGroup auth
 * @apiSuccess (302) {String} into linkedin
 */
router.get(
  `/auth/linkedin`,
  passport.authenticate('v1_linkedin', {state: "9f8a9b365c1b62b0eef8494d51826641ebd0e7c3"})
);

router.get(
  `/auth/linkedin/callback`,
  passport.authenticate('v1_linkedin', {session: false}),
  V1_SET_JWT_token
);

/**
 * @api {get} api/v1/auth/google
 * @apiName authGoogle
 * @apiGroup auth
 * @apiSuccess (302) {String} into google
 */
router.get(
  `/auth/google`,
  passport.authenticate('v1_google', {session: false})
);

router.get(
  `/auth/google/callback`,
  passport.authenticate('v1_google', {session: false}),
  V1_SET_JWT_token
);

module.exports = router;
