const nodemailer = require("nodemailer");
const htmlToPdfBuffer = require("./pdf");

const senEmailWithAttachment = async (userAddress) => {
  try {
    const fileBuffer = await htmlToPdfBuffer(userAddress);
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
      from: "abdulgaffaribnrasul@gmail.com",
      to: userAddress,
      subject: "Billing Information",
      text: "Hi " + userAddress,
      html: fileBuffer,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      return new Promise((resolve, reject) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = senEmailWithAttachment;
