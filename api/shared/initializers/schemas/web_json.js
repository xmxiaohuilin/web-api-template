let mongoose = require ('mongoose');
let Schema = mongoose.Schema;

let WebJsonSchema = new Schema(
  {
    type: String,
    json: Schema.Types.Mixed,
  },
  {
    timestamps: true,
    collection: 'web_jsons',
  }
);

mongoose.model('WebJson', WebJsonSchema);
