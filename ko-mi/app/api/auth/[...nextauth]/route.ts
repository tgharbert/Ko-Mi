import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// should log the user to the database??
// save the user to the db if they do not exist, else update their login info??
// const checkUser = () => {};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
});

export { handler as GET, handler as POST };
