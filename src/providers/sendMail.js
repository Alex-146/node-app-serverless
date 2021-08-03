// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_NOTIFY_USER } = process.env;

const nodemailer = require("nodemailer");

const transporter =  nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
});

function sendMessage(text) {
  return transporter.sendMail({
    from: SMTP_USER,
    to: SMTP_NOTIFY_USER,
    subject: "Temp subject",
    text
  });
}

module.exports = sendMessage;
