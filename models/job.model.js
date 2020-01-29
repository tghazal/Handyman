const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const User = require('./userData.model');

const jobSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  category: String,
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: Number
  },
  bids: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      price: Number,
      status: {
        type: String,
        enum: ['pending', 'denied', 'active', 'completed', 'failed'],
        default: 'pending'
      }
    }
  ]
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
