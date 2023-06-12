import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongoDB";
import dbConnect from "../../../lib/monogConnect";
import { findAccount } from "../../../services/db/accountsService";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await dbConnect();
      const foundAccount = await findAccount({
        providerAccountId: account?.providerAccountId,
      });

      const provider = { ...foundAccount }?._doc?.provider;

      if (foundAccount && provider !== account.provider) {
        throw new Error(
          `You are not allowed to sign in with ${account.provider},try with ${provider}`
        );
      }
      if (!user?.role) {
        user.role = "customer";
      }
      if (foundAccount && provider === account.provider) return true;
      return true;
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },

  secret: process.env.JWT_SECRET,
  // debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
export default NextAuth(authOptions);
