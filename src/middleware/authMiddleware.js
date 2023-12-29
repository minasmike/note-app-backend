const jwt = require("jsonwebtoken");
require("dotenv").config();
// middleware for authontication for routes.
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Unauthorized: Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("middleware called");
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ success: false, error: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
