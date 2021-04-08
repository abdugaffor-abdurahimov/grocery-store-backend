const nodemailer = require("nodemailer");

module.exports = senEmailWithAttachment = (toUser) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: " abdulgaffaribnrasul@gmail.com",
    to: toUser,
    subject: "Billing Information",
    text: "TEST",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error ", err);
    } else {
      console.log("Email sent");
      console.log(data);
    }
  });
};
