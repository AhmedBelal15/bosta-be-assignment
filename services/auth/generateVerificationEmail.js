const sendEmail = require("../../utils/sendEmail");
const jwt = require("jsonwebtoken");

const generateVerificationEmail = async (email, id) => {
  //Generate jwt token to verify email
  const verificationToken = jwt.sign(
    { email, id },
    process.env.EMAIL_TOKEN_SECRET,
    {
      expiresIn: process.env.EMAIL_TOKEN_EXPIRESIN,
    }
  );

  const options = {
    email,
    subject: "Bosta Backend Assignment - Verifiication Email",
    message: `U recieved this email regarding account verification
        please click on this link to verify your account
        note that the token is valid only for one day!
        <a href="${process.env.CLIENT_URL}/verifyemail/${verificationToken}"> 
        click here
        </a>
        `,
  };
  sendEmail(options);
};

module.exports = generateVerificationEmail;
