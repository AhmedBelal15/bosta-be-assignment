const Joi = require("joi");
//Register Validation
const register = Joi.object({
  username: Joi.string().min(1).max(60).required(),
  email: Joi.string().min(5).max(255).email().required(),
  password: Joi.string().min(6).max(255).required(),
});

//Login Validation
const login = Joi.object({
  email: Joi.string().max(255).required().email(),
  password: Joi.string().min(6).max(255).required(),
});

//Forgot Password Request Validation
const forgotPassword = Joi.object({
  email: Joi.string().max(255).required().email(),
});

//Update Password Request Validation
const updatePassword = Joi.object({
  password: Joi.string().min(6).max(255).required(),
});

module.exports = {
  register,
  login,
  forgotPassword,
  updatePassword,
};
