let GoogleStrategy         = require('passport-google-oauth2').Strategy;
let googleStrategyCallback = require('./google_strategy_callback');
/**
 * @access public
 * @function module:api/v1/middlewares/passport~googleStrategy
 * @description passport strategy to handle social authentication through google
 * @returns {void} Returns nothing
 */
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.WEB_URL}/api/v1/auth/google/callback`,
    passReqToCallback: true,
    scope: [
      'profile',
      'email',
    ],
  },
  googleStrategyCallback
);
