/**
 * @access public
 * @module api/v1/middlewares/passport
 * @description This middleware will trigger the oauth2 process for users signing up or signing
 * in through social or local accounts.
 * @returns {void} Returns nothing
 */

let passport         = require('passport');
let facebookStrategy = require('./passport/facebook_strategy');
let linkedinStrategy = require('./passport/linkedin_strategy');
let googleStrategy   = require('./passport/google_strategy');

passport.use('v1_facebook', facebookStrategy);
passport.use('v1_linkedin', linkedinStrategy);
passport.use('v1_google', googleStrategy);
