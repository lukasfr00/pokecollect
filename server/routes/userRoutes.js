const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("../middleware/auth");
const user = require("../models/user");

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// POST zur Registrierung eines neuen Benutzers
router.post("/register", async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;
  try {
    const user = new User({
      username,
      password,
      email,
      firstname,
      lastname,
      pokemonCollection: [],
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.level = 1;

    user.xp = {
      currentXp: 0,
      neededXp: 100,
    };

    await user.save();

    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;

    await user.save();

    const accessToken = generateAccessToken(user);

    res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST zum Login eines Benutzers
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Ungültige Anmeldeinformationen" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Ungültige Anmeldeinformationen" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;

    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST zum Erneuern eines Access Tokens
router.post("/token", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Token is required" });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.userId);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

// POST zum Abmelden eines Benutzers
router.post("/logout", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.refreshToken = null;

    await user.save();

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/user", auth, async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) return res.status(404).json({ message: "User not found" });

    const user = {
      id: userData.id,
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      level: userData.level,
      xp: userData.xp,
    };

    console.log(user);

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Sammlung eines Benutzers
router.get("/pokemonCollection", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: "pokemonCollection.pokemon",
      populate: { path: "primaryType secondaryType" },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    //console.log(JSON.stringify(user.pokemonCollection, null, 2)); // Log die Sammlung

    res.json(user.pokemonCollection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST zum Hinzufügen eines Pokémon zur Sammlung
router.post("/pokemonCollection", auth, async (req, res) => {
  const { pokemonId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const pokemonIndex = user.pokemonCollection.findIndex(
      (p) => p.pokemon.toString() === pokemonId
    );
    if (pokemonIndex > -1) {
      user.pokemonCollection[pokemonIndex].count += 1;
    } else {
      user.pokemonCollection.push({ pokemon: pokemonId, count: 1, level: 1 });
    }
    await user.save();
    const updatedUser = await User.findById(req.userId).populate({
      path: "pokemonCollection.pokemon",
      populate: { path: "primaryType secondaryType" },
    });
    res.json(updatedUser.pokemonCollection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST zum Hinzufügen mehrerer Pokémon zur Sammlung
router.post("/pokemonCollection/update", auth, async (req, res) => {
  const { pulledPokemon } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    pulledPokemon.forEach((pulled) => {
      const pokemonIndex = user.pokemonCollection.findIndex((p) =>
        p.pokemon._id.equals(pulled._id)
      );
      if (pokemonIndex > -1) {
        user.pokemonCollection[pokemonIndex].count += 1;
      } else {
        user.pokemonCollection.push({
          pokemon: pulled._id,
          count: 1,
          level: 1,
        });
      }
    });

    await user.save();
    const updatedUser = await User.findById(req.userId).populate({
      path: "pokemonCollection.pokemon",
      populate: { path: "primaryType secondaryType" },
    });
    res.json({
      message: "Sammlung erfolgreich aktualisiert",
      pokemonCollection: updatedUser.pokemonCollection,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
