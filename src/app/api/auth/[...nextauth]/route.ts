 import NextAuth from "next-auth";
 import { authOptions } from "./options";
 import bcrypt from "bcryptjs";
 import CredentialsProvider from "next-auth/providers/credentials";
 import dbConnect from "@/lib/dbConnect";
 import UserModal from "@/models/User";

 const handler = NextAuth({
    providers: [
        CredentialsProvider({
          id: "credentials",
          name: "Credentials",
          credentials: {
            identifier: { label: "email", type: "text" },
            password: { label: "password", type: "text" },
          },
          async authorize(credentials: any): Promise<any> {
            await dbConnect();
            try {
              const user = await UserModal.findOne({
                $or: [{ username: credentials.identifier }, { email: credentials.identifier }],
              });
              console.log(user)
              if (!user) {
                throw new Error("User not found");
              }
              if (user.isVerified) {
                throw new Error("Please verify your credentials before continuing with authentication");
              }
              const isPasswordCorrect = await bcrypt.compare(credentials.password, String(user.password));
              if (!isPasswordCorrect) {
                throw new Error("Invalid credentials");
              }
              if (isPasswordCorrect) {
                return user;
              }
            } catch (err: any) {
              throw new Error(err);
            }
          },
        }),
      ],
      callbacks: {
        async jwt({ token, user }: { token: any; user: any }): Promise<any> {
          if (user) {
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.username = user.username;
          }
          return token;
        },
        async session({ session, token }: { session: any; token: any }): Promise<any> {
          if (token) {
            token._id = token._id?.toString();
            token.isVerified = token.isVerified;
            token.username = token.username;
          }
          return session;
        },
      },
    //   pages: {
    //     signIn: "/sign-in",
    //   },
      session: {
        strategy: "jwt",
        // jwt: {
        //   secret: process.env.JWT_SECRET,
        //   encryption: true,
        //   maxAge: 30 * 24 * 60 * 60, // 30 days
        // },
      },
      secret: process.env.JWT_SECRET,
 });

 export {handler as GET, handler as POST,}