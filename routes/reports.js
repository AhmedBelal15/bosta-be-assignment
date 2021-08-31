const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const isUserVerified = require("../middleware/isUserVerified");
const { getAllChecks, getReportsByTag } = require("../controllers/reports");
//Protect routes
router.use(protect);
router.use(isUserVerified);

router.route("/").get(getAllChecks);
router.route("/tag/:tag").get(getReportsByTag);

module.exports = router;
