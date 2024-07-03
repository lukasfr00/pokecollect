const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Authorization header is required" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token is required" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);

    if (!user) return res.status(401).json({ message: "Invalid token" });

    req.userId = user._id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
