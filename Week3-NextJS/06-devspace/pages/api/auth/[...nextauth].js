import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await client.connect();
        const db = client.db("devspace");
        const users = db.collection("users");

        const user = await users.findOne({ username: credentials.username }); // this is quite slow
        
        if (!user) {
          console.log("User not found"); // debugging
          return null;
        } 

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (passwordMatch) {
          console.log("Successful signin for user", user.username); // debugging
          return { 
            id: user._id.toString(), 
            username: user.username,
            realName: user.realName,
            bio: user.bio,
            profileImage: user.profileImage};
        } else {
          console.log("Password does not match"); // debugging
          return null;
        }
      },
    }),
  ],
  database: process.env.MONGODB_URI,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(token, user) {
      // If the user object is available, add the additional fields to the token
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.realName = user.realName;
        token.bio = user.bio;
        token.profileImage = user.profileImage;
      }
      return token;
    },
    async session(session, token) {
      if (token?.id) {
        // Add the additional fields to the session object
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.realName = token.realName;
        session.user.bio = token.bio;
        session.user.profileImage = token.profileImage; 
      }
      return session;
    },
  },
});
