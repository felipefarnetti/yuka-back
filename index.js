const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
//User Model
const User = require("./models/User");

mongoose.connect(process.env.MONGODB_URI);

//Routes
const userRoutes = require("./routes/user");
app.use(userRoutes);

// app.all("*", (req, res) => {
//   res.status(404).json({ message: "This route does not exist" });
// });

app.get("/", (req, res) => {
  res.json("Bienvenue sur le back de YUKA");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
