const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String },
  salt: { type: String },
  hash: { type: String }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;