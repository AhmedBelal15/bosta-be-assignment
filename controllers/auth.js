const asyncHandler = require("../middleware/asyncHandler");
const validator = require("../middleware/authValidator");
const generateVerificationEmail = require("../services/auth/generateVerificationEmail");
const hashingService = require("../services/auth/hashingService");
const jwt = require("jsonwebtoken");
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
  const hashedPassword = await hashingService.hashPassword(req.body.password);
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
    message: "Email verified successfully.",
  });
});

/**
 * @description     Login user
 * @method          POST /api/v1/auth/login
 * @access          Public
 */

const login = asyncHandler(async (req, res, next) => {
  //Validate request
  const loginValidator = validator.login;
  await loginValidator.validateAsync(req.body);

  // Get user from database
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    return next(new Error("Invalid Credentials"));
  }

  //Compare password with the hashed one
  const isMatch = await hashingService.matchingPassword(
    req.body.password,
    user.password
  );
  if (!isMatch) {
    return next(new Error("Invalid Credentials"));
  }

  // check if user is verified
  if (!user.isVerified) {
    return next(new Error("Plaese verify your email first"));
  }

  //Sign JWT Token
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN }
  );
  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN }
  );

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: { accessToken, refreshToken },
  });
});

module.exports = { register, verifyEmail, login };
