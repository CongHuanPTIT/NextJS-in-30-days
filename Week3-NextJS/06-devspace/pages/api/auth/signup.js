import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs"; // For password hashing

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password, realName, bio, profileImage } = req.body;

    await client.connect();
    const db = client.db("devspace");
    const users = db.collection("users");

    const existingUser = await users.findOne({ username });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      await users.insertOne({
        username,
        password: hashedPassword,
        realName,
        bio,
        profileImage,
      });

      res.status(201).json({ message: "User created" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}