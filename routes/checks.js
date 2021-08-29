const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const { createCheck } = require("../controllers/checks");

router.route("/").post(protect, createCheck);

module.exports = router;
