import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const verifyEmail = (id) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      type: "login",
      user: "jaiswar2203@gmail.com",
      pass: "Jstar30don",
    },
    from: "jaiswar2203@gmail.com",
  });

  const url = `http://localhost:4000/user/verify/${verificaitonToekn}`;
  await transporter.sendMail({
    to: email,
    subject: "Verify Account",
    html: `Click <a href='${url}'>here</a> to confirm your email`,
  });
};

export default verifyEmail;
