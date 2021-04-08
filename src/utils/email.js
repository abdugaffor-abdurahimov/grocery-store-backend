// const { mailTrapName, mailTrapPassword } = require("../config/env");
// const nodemailer = require("nodemailer");

// export const senEmailWithAttachment = () => {
//   // const ses = new AWS.SES();

//   const transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: mailTrapName,
//       pass: mailTrapPassword,
//     },
//   });
//   const message = {
//     from: "abdurahimov.97@list.ru", // Sender address
//     to: "to@email.com", // List of recipients
//     subject: "Design Your Model S | Tesla", // Subject line
//     text: "Have the most fun you can in a car. Get your Tesla today!", // Plain text body
//   };
//   transporter.sendMail(message, function (err, info) {
//     if (err) console.log(err);
//     console.log(info);
//   });
// };
