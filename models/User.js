const mongoose = require("mongoose");

const User = mongoose.model("user", {
  email: { type: String, required: true },
  username: { type: String, required: true },
  token: { type: String, required: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  favorites: [{ type: String }],
});

module.exports = User;
