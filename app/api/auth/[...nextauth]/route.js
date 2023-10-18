import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        let email = credentials.email;
        let password = credentials.password;

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        let response;

        try {
          response = await axios.post(`${process.env.BASE_URL}/login/admin`, {
            email,
            password,
          });
          console.log(response);
        } catch (error) {
          console.error("Error fetching user:", error);
        }

        if (!response) {
          return null;
        } else {
          //set

          const user = response.data;
          console.log("user");
          console.log(user);

          return user;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      //console.log("jwt callback", { token, user, session });

      //pass in user token
      if (user) {
        return {
          ...token,
          api_token: user.token,
          user: user.admin,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      // pass in user token session
      return {
        ...session,
        user: {
          ...session.user,
          api_token: token.api_token,
          user: token.user,
        },
      };

      //return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
