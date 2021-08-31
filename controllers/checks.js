const asyncHandler = require("../middleware/asyncHandler");
const checkValidator = require("../middleware/checksValidator");
const Check = require("../models/Check");
const Report = require("../models/Report");
const initialReport = require("../utils/initialReport");
const performChecks = require("../services/checks/performChecks");

/**
 * @description     Create Check
 * @method          POST /api/v1/checks
 * @access          Private
 */
const createCheck = asyncHandler(async (req, res, next) => {
  // Validate request
  const createCheckValidator = checkValidator.createCheck;
  await createCheckValidator.validateAsync(req.body);

  // Add user id to the req.body before saving it to data base
  req.body.user = req.user.id;
  //Create check in database
  const check = await Check.create(req.body);

  //Create initial report
  await Report.create(initialReport(check.id));

  res.status(200).json({
    success: true,
    data: check,
    tokens: req.tokens,
  });
});

/**
 * @description     Edit Check Status Running/Paused
 * @method          PUT /api/v1/checks/:checkId
 * @access          Private
 */
const changeCheckStatus = asyncHandler(async (req, res, next) => {
  //Validate request
  const changeCheckStatusValidator = checkValidator.changeCheckStatus;
  await changeCheckStatusValidator.validateAsync(req.body);

  const check = await Check.findById(req.params.checkId);

  //Check if the user is the owner of the check
  if (String(check.user) !== req.user.id) {
    return next(new Error("Not authorized"));
  }

  //update check status
  check.paused = req.body.paused;
  await check.save();

  res.status(200).json({
    success: true,
    message: "Status changed successfully",
    tokens: req.tokens,
  });
});

/**
 * @description     Delete Check
 * @method          DELETE /api/v1/checks/:checkId
 * @access          Private
 */
const deleteCheck = asyncHandler(async (req, res, next) => {
  const check = await Check.findById(req.params.checkId);
  //Check if the user is the owner of the check

  if (String(check.user) !== req.user.id) {
    return next(new Error("Not authorized"));
  }

  //update check status
  await check.remove();

  res.status(200).json({
    success: true,
    message: "Check deleted successfully",
    tokens: req.tokens,
  });
});

/**
 * @description     Get Checks For User
 * @method          GET /api/v1/checks
 * @access          Private
 */
const getChecksForUser = asyncHandler(async (req, res, next) => {
  const checks = await Check.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: checks.length,
    data: checks,
    tokens: req.tokens,
  });
});

/**
 * @description     Get Single Check For User By Check Id
 * @method          GET /api/v1/checks/:checkId
 * @access          Private
 */
const getSingleCheck = asyncHandler(async (req, res, next) => {
  //Get Check
  const check = await Check.findById(req.params.checkId);

  //Check if the user is the owner of the check
  if (String(check.user) !== req.user.id) {
    return next(new Error("Not authorized"));
  }

  res.status(200).json({
    success: true,
    data: check,
    tokens: req.tokens,
  });
});

/**
 * @description     Get Checks by tag
 * @method          GET /api/v1/checks/tag/:tag
 * @access          Private
 */
const getChecksByTag = asyncHandler(async (req, res, next) => {
  //Get Checks
  const checks = await Check.find({ tag: req.params.tag, user: req.user.id });

  //Check if the user is the owner of the check

  res.status(200).json({
    success: true,
    data: checks,
    tokens: req.tokens,
  });
});

/**
 * @description     Perform Checks On The URLs
 * @method          GET /api/v1/checks/do
 * @access          Public
 */
const doChecks = asyncHandler(async (req, res, next) => {
  const checks = await Check.find({
    nextCheck: { $lte: Date.now() },
    paused: false,
  }).populate("user");
  for (let i = 0; i < checks.length; i++) {
    const prevReport = await Report.findOne({ check: checks[i].id });
    const newReport = await performChecks(checks[i], prevReport);
    const savedReport = await Report.findByIdAndUpdate(
      prevReport.id,
      newReport,
      { new: true }
    );
    checks[i].nextCheck = Date.now() + checks[i].interval * 60 * 1000;
    await checks[i].save();
    console.log(newReport);
    savedReport.history.push(newReport);
    await savedReport.save();
  }

  res.json(checks);
  // sendCheckRequest;
});

module.exports = {
  createCheck,
  changeCheckStatus,
  deleteCheck,
  getChecksForUser,
  getSingleCheck,
  getChecksByTag,
  doChecks,
};
