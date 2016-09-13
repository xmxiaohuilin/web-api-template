/* global __DB */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// TODO document this object
let UserSchema = new Schema(
  {
    candidate_id: String,
    name: String,
    facebook: {
      id: String,
      display_name: String,
      access_token: String,
    },
    linkedin: {
      id: String,
      display_name: String,
      access_token: String,
    },
    google: {
      id: String,
      display_name: String,
      access_token: String,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("User", UserSchema);
