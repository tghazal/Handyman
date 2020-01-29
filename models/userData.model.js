const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Job = require('./job.model');

const UserDataSchema = new Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, default: null },
  photo: { type: String, default: null },
  phone: { type: Number, default: null },
  image: { type: Buffer, default: null },
  address:
  {
    address1: { type: String, default: null },
    address2: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zip: { type: String, default: null }
  },
  skills: { type: Array, default: [] },
  myJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    }
  ],
  myBids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job'
    }
  ],
  history: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      myJob: {
        type: Boolean,
        default: null,
        required: true
      },
    }
  ]
});

const UserData = mongoose.model("UserData", UserDataSchema);

module.exports = UserData;