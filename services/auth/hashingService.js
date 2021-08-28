const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const matchingPassword = async (plainTextPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainTextPassword, password);
  return match;
};
module.exports = { hashPassword };
