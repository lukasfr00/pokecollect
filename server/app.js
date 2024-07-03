const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const https = require("https");
const fs = require("fs");
const path = require("path");

require("dotenv").config();
const app = express();

const corsOptions = {
  origin: "http://localhost:4200", // Erlaubt Anfragen von diesem Ursprung
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Erlaubt diese Methoden
  allowedHeaders: ["Content-Type", "Authorization"], // Erlaubt diese Header
  optionsSuccessStatus: 200, // Für alte Browser
};

app.use(cors(corsOptions));

connectDB();

// Ihre bestehenden Middleware und Routen
app.use(express.json());

// Routen
app.use("/api/pokemon", require("./routes/pokemonRoutes"));
app.use("/api/packs", require("./routes/packRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
