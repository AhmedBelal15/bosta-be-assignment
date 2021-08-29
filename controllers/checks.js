const asyncHandler = require("../middleware/asyncHandler");
const checkValidator = require("../middleware/checksValidator");
const Check = require('../models/Check');

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

  const check = await Check.create(req.body)
  res.status(200).json({
      success: true,
      data: check,
      tokens: req.tokens
  })
});

/**
 * @description     Edit Check Status Running/Paused
 * @method          PUT /api/v1/checks/:checkId
 * @access          Private
 */
const changeCheckStatus = asyncHandler(async(req, res, next) => {
  //Validate request
  const changeCheckStatusValidator = checkValidator.changeCheckStatus;
  await changeCheckStatusValidator.validateAsync(req.body);

  const check = await Check.findById(req.params.checkId);
  //Check if the user is the owner of the check

  if(String(check.user) !== req.user.id){
    return next(new Error('Not authorized'))
  }

  //update check status
  check.paused = req.body.paused
  await check.save();

  res.status(200).json({
    success: true,
    message: "Status changed successfully"
  })
})
module.exports = { createCheck, changeCheckStatus };
