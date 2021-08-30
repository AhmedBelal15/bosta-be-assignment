const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const { createCheck, changeCheckStatus, deleteCheck, getChecksForUser, getSingleCheck, doChecks } = require("../controllers/checks");

router.route('/do').get(doChecks)

//Protect routes
router.use(protect)

router.route("/").post(createCheck).get(getChecksForUser);
router.route("/:checkId").put(changeCheckStatus).delete(deleteCheck).get(getSingleCheck);
module.exports = router;
