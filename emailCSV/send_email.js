import nodemailer from "nodemailer";
import 'dotenv/config'; // used to import the sender email login and password using a global variable set in a local .env file
// Note! the .env file containing the sender email account info is will not be visible on the github repo because .env is included in the files to be ignored by .gitignore due to the security risk involved with making my personal email address login info available publicly.

export const sendEmail = (to, attachment1) => {
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = {
    to: to,
    subject: `Weekly CSVs`,
    text: "Here you go Mr. Boss",
    attachments: [
      {
        filename: attachment1.filename,
        content: attachment1.content,
      },
    ],
  };

  smtpTransport.sendMail(mail, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("successfully sent!")
    }
    smtpTransport.close();
  });
};

