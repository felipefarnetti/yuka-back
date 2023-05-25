const mongoose = require("mongoose");

const User = mongoose.model("user", {
  email: { type: String, required: true },
  username: { type: String, required: true },
  token: { type: String },
  salt: { type: String },
  hash: { type: String },
  favorites: [{ type: String }],
});

module.exports = User;
