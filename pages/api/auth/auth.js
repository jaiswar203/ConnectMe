import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, username } = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const user = db.collection("userdatas");

    const existingUser = await user.findOne({ email });
    const existingUserName = await user.findOne({ username });

    if ( existingUser || existingUserName) {
      return res
        .status(404)
        .json({
          message: `User Already Exist ${existingUser ? "with this gmail" : "with this name"} `,
          
        });
    }

    try {
      const {insertedId}=await user.insertOne({ email, name, username });
      res.status(201).json({ message: "SignUp SuccessFull", existingUser: {email,name,username,_id:insertedId} });
    } catch (error) {
      res.status(501).json({ message: "Try Again" });
      
    }

    client.close();
  }
}
