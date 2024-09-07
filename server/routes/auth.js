const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({ email, username, hashedPassword });
  res.status(200).json(newUser);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const currUser = await User.findOne({ username });
  if (currUser) {
    const isAuthenticated = await bcrypt.compare(
      password,
      currUser.hashedPassword
    );
    if (isAuthenticated) {
      res.status(200).json(currUser);
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
});

module.exports = router;
