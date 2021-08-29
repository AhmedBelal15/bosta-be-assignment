const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const { createCheck, changeCheckStatus, deleteCheck } = require("../controllers/checks");

router.route("/").post(protect, createCheck);
router.route("/:checkId").put(protect, changeCheckStatus).delete(protect, deleteCheck);
module.exports = router;
