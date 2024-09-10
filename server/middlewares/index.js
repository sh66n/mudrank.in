require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid token",
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "No header",
    });
  }
};

const verifyCircle = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.isCircle) {
        res.status(403).json({
          message: "Access forbidden.",
        });
      } else {
        req.user = decoded;
        next();
      }
    } catch (e) {
      res.status(403).json({
        messages: "Invalid token.",
      });
    }
  } else {
    res.status(401).json({
      message: "No header.",
    });
  }
};

module.exports = {
  verifyToken,
  verifyCircle,
};
