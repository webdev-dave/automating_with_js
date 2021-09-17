const mailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (to, attachment1) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = {
    to,
    subject: `Weekly CSVs`,
    text: "Here you go Mr. Boss",
    attachments: [
      {
        filename: attachment1.filename,
        content: attachment1.content,
      },
    ],
  };

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
    }
    smtpTransport.close();
  });
};

module.exports = sendEmail;
