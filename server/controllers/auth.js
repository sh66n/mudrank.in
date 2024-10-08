require("dotenv").config();
const User = require("../models/user");
const PostalCircle = require("../models/postalCircle");
const errorResponse = require("../utils/error");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ email, username, hashedPassword });
    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 259200000, // 3 days
    });
    res.status(200).json({
      username: newUser.username,
      id: newUser._id,
      accessToken,
    });
  } catch (e) {
    errorResponse(res, e);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const currUser = await User.findOne({ username });
  if (currUser) {
    const isAuthenticated = await bcrypt.compare(
      password,
      currUser.hashedPassword
    );
    if (isAuthenticated) {
      const accessToken = jwt.sign(
        { id: currUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: 259200000, // 3 days
        }
      );
      res.json({
        username: currUser.username,
        id: currUser._id,
        accessToken,
      });
    } else {
      res.status(401).json({
        message: "incorrect username or password",
      });
    }
  } else {
    res.status(400).json({
      message: "incorrect username or password",
    });
  }
};

const loginCircle = async (req, res) => {
  const { username, password } = req.body;
  const currCircle = await PostalCircle.findOne({ username });
  if (currCircle) {
    const isAuthenticated = await bcrypt.compare(
      password,
      currCircle.hashedPassword
    );
    if (isAuthenticated) {
      const accessToken = jwt.sign(
        { id: currCircle._id, isCircle: true },
        process.env.JWT_SECRET,
        {
          expiresIn: 259200000, // 3 days
        }
      );
      res.json({
        username: currCircle.username,
        id: currCircle._id,
        isCircle: true,
        accessToken,
      });
    } else {
      res.status(401).json({
        message: "Incorrect username or password.",
      });
    }
  } else {
    res.status(404).json({
      message: "Circle not found.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginCircle,
};
