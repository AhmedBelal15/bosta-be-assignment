const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let accessToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    accessToken = req.headers.authorization.split(" ")[1];
  }
  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }

  // verify access token
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (error) {
    //if access token isn't verified we try to verify refresh token
    const refreshToken = await req.headers.refreshToken;
    const decodedAccessToken = jwt.decode(accessToken);
    const userId = decodedAccessToken.id;
    const email = decodedAccessToken.email;
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      //if refresh token is valid we sign new tokens
      if (decoded.id === userId) {
        req.user = userId;
        const accessToken = jwt.sign(
          { id: userId, email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN }
        );
        const refreshToken = jwt.sign(
          { id: userId, email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN }
        );
        req.tokens = { accessToken, refreshToken };
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      });
    }
  }

  next();
};

module.exports = protect;
