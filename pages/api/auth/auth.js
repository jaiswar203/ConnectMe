import { MongoClient } from "mongodb";

import jwt from 'jsonwebtoken'

import sgMail from '@sendgrid/mail'

const api_key="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"

sgMail.setApiKey(api_key)

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

      const url = `https://connectmev2.herokuapp.com/user/verify/${verificaitonToekn}`;

      const message={
        to:email,
        from:"info@connectme.co.in",
        subject:"Verify Account",     
        html: `Click <a href='${url}'>here</a> to confirm your email`
      }
      
      await sgMail.send(message)
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
