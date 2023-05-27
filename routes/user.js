const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");
const cors = require("cors");
router.use(cors());

///////////////////
//USER SIGNUP/////
//////////////////

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const userWithEmailReceived = await User.findOne({ email: email });
    if (userWithEmailReceived !== null) {
      return res.status(409).json({ message: "This email is already used" });
    }

    const token = uid2(64);
    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);

    const newUser = new User({
      email: email,
      username: username,
      token: token,
      salt: salt,
      hash: hash,
      favorites: [],
    });

    await newUser.save();
    res.json({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      token: newUser.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///////////////////
//USER LOGIN/////
//////////////////

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user === null) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newHash = SHA256(user.salt + password).toString(encBase64);
    if (newHash !== user.hash) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      token: user.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///////////////////
// GET USER INFO //
///////////////////

router.get("/user", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///////////////////
//DELETE USER/////
//////////////////

router.delete("/user/delete", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;

    // Supprimer l'utilisateur de la base de données
    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///////////////////
//FAVORITES ADD/////
//////////////////

router.post("/favorites/add", isAuthenticated, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    // console.log(req.body);

    // Vérifier si le produit est déjà dans la liste des favoris de l'utilisateur
    if (user.favorites.includes(productId)) {
      return res.status(409).json({ message: "Product already in favorites" });
    }

    // Ajouter le produit à la liste des favoris de l'utilisateur
    user.favorites.push(productId);
    await user.save();

    res.json({ message: "Product added to favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/////////////////////////
// GET USER FAVORITES //
/////////////////////////

router.get("/favorites", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favorites = user.favorites;
    res.json({ favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///////////////////////
//FAVORITES DELETE/////
/////////////////////

router.delete("/favorites/delete", isAuthenticated, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    // Vérifier si le produit est dans la liste des favoris de l'utilisateur
    const index = user.favorites.indexOf(productId);
    if (index === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in favorites" });
    }

    // Supprimer le produit de la liste des favoris de l'utilisateur
    user.favorites.splice(index, 1);
    await user.save();

    res.json({ message: "Product removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///////////////////////
// ADD SCANNED PRODUCT
///////////////////////

router.post("/products/add", isAuthenticated, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (user.scannedProducts.includes(productId)) {
      return res.status(409).json({ message: "Product already scanned" });
    }

    user.scannedProducts.push(productId);
    await user.save();

    res.json({ message: "Product added to scanned products" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///////////////////////
// GET SCANNED PRODUCTS
///////////////////////

router.get("/products", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const scannedProducts = user.scannedProducts;
    res.json({ scannedProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
