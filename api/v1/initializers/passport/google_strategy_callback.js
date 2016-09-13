let mongoose  = require('mongoose');
let User      = mongoose.model('User');
let WebJson   = mongoose.model('WebJson');
let Candidate = mongoose.model('Candidate');
/**
 * @access public
 * @function module:api/v1/middlewares/passport~googleStrategyCallback
 * @description Called after verifying login credentials with Google.
 * If the user already exists, pass the user through the done callback. If the user doesn't exist,
 * save profile as a new webJson, create a candidate, and create a user
 * @param {String} req - All parameters wrapped up into an object
 * @param {String} access_token - token used to make api calls to facebook
 * @param {String} refresh_token - used to get another access token
 * @param {Object} profile - object with basic profile information
 * @param {Function} done - callback function that takes an error in first parameter
 * and passes the 2nd parameter to req.user
 * @returns {void} Returns nothing
 */
module.exports = function(
  req,
  access_token,
  refresh_token,
  profile,
  done
) {
  let userPromise = User.findOne({'google.id': profile.id}).exec()
  .then(function returnIfUserOrCreateWebJson(user){
    if (user) {
      userPromise.cancel();
      return done(null, user);
    }
    let newWebJson = new WebJson({
      type: "google",
      json: profile,
    });
    return newWebJson.save();
  })
  .then(function createNewCandidateAndAssociateWebJson(newWebJson) {
    let newCandidate = new Candidate({
      source: {
        google_json: {
          web_json_id: String(newWebJson._id),
          url: profile._json.url,
        },
      },
    });
    return newCandidate.save();
  })
  .then(function createNewUserAndAssociateCandidate(candidate) {
    let newUser = new User({
      candidate_id: String(candidate._id),
      google: {
        id: profile.id,
        display_name: profile.displayName,
        access_token: access_token,
      },
    });
    return newUser.save();
  })
  .then(function doneNewUser(newUser) {
    done(null, newUser);
  })
  .catch(function(error) {
    done(error);
  });
};
