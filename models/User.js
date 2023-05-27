const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  favorites: [{ type: String }],
  // scannedProducts: [{ type: String }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
