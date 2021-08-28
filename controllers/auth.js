const asyncHandler = require("../middleware/asyncHandler");
const validator = require("../middleware/validator");
const generateVerificationEmail = require("../services/auth/generateVerificationEmail");
const hashPassword = require("../utils/hashPassword");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

/**
 * @description     Register User
 * @method          POST /api/v1/auth/register
 * @access          Public
 */

const register = asyncHandler(async (req, res, next) => {
  //Validate request
  const registerValidator = validator.register;
  await registerValidator.validateAsync(req.body);

  //Hash password
  const hashedPassword = await hashPassword(req.body.password);
  //Register user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //send verification email
  generateVerificationEmail(user.email, user._id);

  res.json({
    success: true,
    message:
      "An email has been sent to you with instructions on verifying your email",
  });
});

/**
 * @description     Verify Email
 * @method          PUT /api/v1/auth/verifyemail/:token
 * @access          Public
 */

const verifyEmail = asyncHandler(async (req, res, next) => {
  //Verify token
  const verificationToken = req.params.token;
  const decoded = jwt.verify(verificationToken, process.env.EMAIL_TOKEN_SECRET);

  //Change user status in database
  await User.findOneAndUpdate(
    { email: decoded.email, _id: decoded.id },
    { isVerified: true },
    { new: true }
  );

  res.status(200).json({
      success: true,
      message: 'Email verified successfully.'
  })
});

module.exports = { register, verifyEmail };
