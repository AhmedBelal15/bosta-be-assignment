const User = require("../models/User");
const asyncHandler = require("./asyncHandler");

const isUserVerified = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.isVerified) {
    return res.status(403).json({
      success: false,
      message: "Please verify your email",
    });
  }
  next();
});

module.exports = isUserVerified;
