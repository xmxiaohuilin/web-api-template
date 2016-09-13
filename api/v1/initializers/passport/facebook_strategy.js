let FacebookStrategy         = require('passport-facebook').Strategy;
let facebookStrategyCallback = require('./facebook_strategy_callback');
/**
 * @access public
 * @function module:api/v1/middlewares/passport~facebookStrategy
 * @description passport strategy to handle social authentication through facebook
 * @returns {void} Returns nothing
 */
module.exports = new FacebookStrategy(
  {
    clientID         : process.env.FB_CLIENT_ID,
    clientSecret     : process.env.FB_CLIENT_SECRET,
    callbackURL      : `${process.env.WEB_URL}/api/v1/auth/facebook/callback`,
    passReqToCallback: true,
    profileFields    : [
      'id',
      'about',
      'email',
      'bio',
      'birthday',
      'education',
      'first_name',
      'gender',
      'hometown',
      'is_verified',
      'last_name',
      'link',
      'locale',
      'location',
      'middle_name',
      'name_format',
      'timezone',
      'verified',
      'website',
      'work',
    ],
  },
  facebookStrategyCallback
);
