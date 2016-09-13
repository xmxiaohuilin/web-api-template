let router = require('express').Router();

/**
 * @api {get} /api/v1/users
 * @apiName GetUser
 * @apiGroup User
 * @apiSuccess {json} hello:world
 */
router.get('/users', function V1_GET_users_index(req, res) {
  res.json({hello: 'world;'});
});

module.exports = router;
