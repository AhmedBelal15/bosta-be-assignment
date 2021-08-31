const asyncHandler = require("../middleware/asyncHandler");
const Report = require("../models/Report");
const Check = require("../models/Check");

/**
 * @description     Get All Reports for user
 * @method          GET /api/v1/reports
 * @access          Private
 */
const getAllChecks = asyncHandler(async (req, res, next) => {
  //Get reports
  const reports = await Report.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    data: reports,
    tokens: req.tokens,
  });
});

/**
 * @description     Get Reports by tag
 * @method          GET /api/v1/reports/tag/:tag
 * @access          Private
 */
const getReportsByTag = asyncHandler(async (req, res, next) => {
  //Get Check with the tag
  const reports = await Check.findOne({ tag: req.params.tag, user: req.user.id });
  
  res.status(200).json({
    success: true,
    data: reports,
    tokens: req.tokens,
  });
});

module.exports = { getAllChecks, getReportsByTag };
