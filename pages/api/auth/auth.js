import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const {email,name} = req.body;
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const user = db.collection("users");

    const existingUser=await user.findOne({email})

    if(existingUser){
        res.status(201).json({message:"User Already Exist,SignIn Successful",existingUser})
    }else{
        const result = await user.insertOne({email,name});
        res.status(201).json({ message: "SignUp SuccessFull",result });
    }
    client.close();
  }
}
