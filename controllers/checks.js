const asyncHandler = require("../middleware/asyncHandler");
const checkValidator = require("../middleware/checksValidator");
const Check = require('../models/Check');

const createCheck = asyncHandler(async (req, res, next) => {
  // Validate request
  const createCheckValidator = checkValidator.createCheck;
  createCheckValidator.validateAsync(req.body);

  // Add user id to the req.body before saving it to data base
  req.body.user = req.user.id;

  const check = await Check.create(req.body)
  res.status(200).json({
      success: true,
      data: check,
      tokens: req.tokens
  })
});

module.exports = { createCheck };
