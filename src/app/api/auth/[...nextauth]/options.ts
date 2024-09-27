import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import User from "@/model/User.model";
import mongoose from "mongoose";
import Account from "@/model/Account.model";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(client, {}),
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        try {
          console.log(user, account, profile);

          console.log(account.session_state);
          await mongoose.connect(process.env.MONGODB_URI!);
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              fullname: user.name,
              role: "EMPLOYEE", // Make sure this matches the allowed roles in the `enum`
              transactions: [],
              image: user.image, // This field is optional
              githubId: user.id,
            });

            const createdUser = await newUser.save();

            if (createdUser) {
              const newAccount = new Account({
                ...account,
                userId: createdUser._id,
              });
              await newAccount.save();
            }
          }
        } catch (err) {
          console.log(err);
          throw new Error(err as string);
        }
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
