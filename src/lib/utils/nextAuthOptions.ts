import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import prisma from "./prisma";
import bcrypt from "bcrypt";
import { signOut } from "next-auth/react";

export const nextauthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: {
          label: "Password",
          type: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          return null;
        }

        return user;
      },
    }),

  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
      } else if (token?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        if (existingUser) {
          token.id = existingUser.id;
          token.email = existingUser.email;
          token.role = existingUser.role;
          token.name = existingUser.name;
        }

        if (!existingUser) {
          await signOut();
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (!token?.email) return session;

      const user = await prisma.user.findUnique({
        where: { email: token.email },
        select: { id: true, email: true, name: true, role: true },
      });

      if (!user) {
        await signOut();
      }

      if (user) {
        session.user.email = user.email;
        session.user.name = user.name;
        session.user.role = user.role;
        session.user.id = user.id;
      }
      return session;
    },

  },
};
