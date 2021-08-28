const express = require("express");
const router = express.Router();
const { register, verifyEmail, login } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/verifyemail/:token").put(verifyEmail);
router.route("/login").post(login);

module.exports = router;
