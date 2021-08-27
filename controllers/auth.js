const asyncHandler = require("../middleware/asyncHandler");
const validator = require("../middleware/validator");

/**
 * @description     Register User
 * @method          POST /api/v1/auth/register
 * @access          Public
 */

const register = asyncHandler(async (req, res, next) => {
    //Validate request
    const registerValidator = validator.register
    await registerValidator.validateAsync(req.body);
    res.json('hello')
});

module.exports = {register}