import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
  if (req.method === "POST") {
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
    const { email, name, username } = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const user = db.collection("userdatas");

    const existingUser = await user.findOne({ email });
    const existingUserName = await user.findOne({ username });

    if (existingUser || existingUserName) {
      return res.status(404).json({
        message: `User Already Exist ${
          existingUser ? "with this gmail" : "with this name"
        } `,
      });
    }

    try {
      const User = await user.insertOne({ email, name, username,isVerified:false });
      const {insertedId}=User
      const verificaitonToekn = jwt.sign({ ID: insertedId }, "verify", {
        expiresIn: "1d",
      });

      const url = `http://localhost:4000/user/verify/${verificaitonToekn}`;
      await transporter.sendMail({
        to: email,
        subject: "Verify Account",
        html: `Click <a href='${url}'>here</a> to confirm your email`,
      });
      res
        .status(201)
        .json({
          message: "SignUp SuccessFull",
          existingUser: { email, name, username, _id: insertedId },
        });
    } catch (error) {
      console.log({error})
      res.status(501).json({ message: "Try Again",error });
    }

    client.close();
  }
}
