import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  if (req.method === "POST") {
    const { email } = req.body;
    const db = client.db();
    const user = db.collection("userdatas");

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "No User Found",
      });
    } else {
      return res
        .status(201)
        .json({ message: "SignUp SuccessFull", existingUser });
    }

  }
  client.close();
}
