import { MongoClient } from "mongodb";

import jwt from 'jsonwebtoken';

const postmark=require("postmark")

const emailSend= new postmark.ServerClient("d1f350b1-dc6a-4842-b191-3b02dd68f054")

const dev_server="http://localhost:4000"
const prod_server="https://connectmev2.herokuapp.com"

export default async function handler(req, res) {
  
  if (req.method === "POST") {
    
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
      const createUserData=await user.findOne({email})
      const verificaitonToekn = jwt.sign({ ID: insertedId }, "verify", {
        expiresIn: "1d",
      });

      const url = `${prod_server}/user/verify/${verificaitonToekn}`;

      const message={
        from:" info@connectme.co.in",
        to:email,
        subject:"Verify Account",     
        text:"Email Verification",
        html: `Click <a href='${url}'>here</a> to confirm your email`
      }

      // email sending through third party api
      
      emailSend.sendEmail({
        From:"info@connectme.co.in",
        To:email,
        Subject:"Verify Account",
        TextBody:"Email Verification",
        HtmlBody:`Click <a href='${url}'>here</a> to confirm your email`
      })

      res
        .status(201)
        .json({
          message: "SignUp SuccessFull",
          existingUser: { email, name, username, _id: insertedId,createUserData },
        });
    } catch (error) {
      console.log({error})
      res.status(501).json({ message: "Try Again",error });
    }

    client.close();
  }
}
