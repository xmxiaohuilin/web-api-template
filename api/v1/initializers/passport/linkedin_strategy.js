let LinkedinStrategy         = require('passport-linkedin-oauth2').Strategy;
let linkedinStrategyCallback = require('./linkedin_strategy_callback');
/**
 * @access public
 * @function module:api/v1/middlewares/passport~linkedinStrategy
 * @description passport strategy to handle social authentication through linkedin
 * @returns {void} Returns nothing
 */
module.exports = new LinkedinStrategy(
  {
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${process.env.WEB_URL}/api/v1/auth/linkedin/callback`,
    passReqToCallback: true,
    scope: [
      'r_emailaddress',
      'r_basicprofile',
    ],
  },
  linkedinStrategyCallback
);
