import { MongoClient } from "mongodb";

import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

// import sgMail from '@sendgrid/mail'

// const api_key="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"

// sgMail.setApiKey(api_key)

let transporter=nodemailer.createTransport({
  name:"www.connectme.co.in",
  host:"us2.smtp.mailhostbox.com",
  port:25,
  secure:false,
  auth:{
    user:"info@connectme.co.in",
    pass:"uscjCqY7"
  }
})

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
        from:" ConnectMe <info@connectme.co.in>",
        subject:"Verify Account",     
        text:"Email Verification",
        html: `Click <a href='${url}'>here</a> to confirm your email`
      }

      await transporter.sendMail(message,(err,info)=>{
        if(err){
          console.log({err})
          return
        }
        console.log("Message Sent Successfully")
        console.log({info})
        transporter.close()
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
