import nodemailer from "nodemailer"

import 'dotenv/config';

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

