const router = require("express").Router();
const { registerUser, loginUser, loginCircle } = require("../controllers/auth");

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/circle-login").post(loginCircle);

module.exports = router;
