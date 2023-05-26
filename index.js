const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
router.use(cors());
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

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
