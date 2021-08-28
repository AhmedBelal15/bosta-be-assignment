const express = require("express");
const router = express.Router();
const { register, verifyEmail } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/verifyemail/:token").put(verifyEmail);

module.exports = router;
