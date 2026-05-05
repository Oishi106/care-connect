import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { compare } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;
        const requestedRole = credentials?.role || "user";

        if (!email || !password) {
          return null;
        }

        const client = await clientPromise;
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user || !user.password) {
          return null;
        }

        const passwordMatches = await compare(password, user.password);

        if (!passwordMatches) {
          return null;
        }

        const userRole = user.role || "user";

        if (requestedRole && requestedRole !== userRole) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name || user.fullName || user.email,
          email: user.email,
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }

      if (!token.role && token.email) {
        const client = await clientPromise;
        const usersCollection = client.db().collection("users");
        const existingUser = await usersCollection.findOne({ email: token.email });

        if (existingUser) {
          if (!existingUser.role && account?.provider === "google") {
            await usersCollection.updateOne(
              { email: token.email },
              { $set: { role: "user", updatedAt: new Date() } }
            );
          }

          token.id = existingUser._id.toString();
          token.role = existingUser.role || "user";
          token.name = existingUser.name || token.name;
          token.email = existingUser.email || token.email;
        } else if (account?.provider === "google") {
          const createdUser = await usersCollection.findOneAndUpdate(
            { email: token.email },
            {
              $setOnInsert: {
                name: token.name || token.email,
                email: token.email,
                role: "user",
                image: token.picture || null,
                emailVerified: null,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
            { upsert: true, returnDocument: "after" }
          );

          if (createdUser?.value) {
            token.id = createdUser.value._id.toString();
            token.role = createdUser.value.role || "user";
          } else {
            token.role = "user";
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
