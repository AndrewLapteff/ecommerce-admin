import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from "./prismadb"

export const {
  handlers,
  auth,
  signOut
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  theme: { colorScheme: "light", },
  providers: [
    Google,
    Github
  ],
  adapter: PrismaAdapter(prismadb),
  callbacks: {
    async session({ session, user }) {
      session.user = user
      return session
    },
    // async signIn({ account, profile }) {
    //   if (!profile?.email) throw new Error("No profile")


    //   const user = await prismadb.user.upsert({
    //     where: { email: profile?.email! },
    //     create: {
    //       email: profile?.email,
    //       name: profile?.name,
    //       image: profile?.picture as string,
    //       stripePurchaseId: '',
    //     },
    //     update: {
    //       email: profile?.email,
    //       name: profile?.name,
    //       image: profile?.picture as string,
    //     },
    //   })
    //   console.log(user)

    //   return true
    // },
    // async jwt({ token, account, profile, isNewUser }) {
    //   if (profile) {
    //     const user = await prismadb.user.findUnique({
    //       where: { email: profile?.email! },
    //     })
    //     if (!user) throw new Error("No user found")

    //     token.id = user.id
    //     token.user = {
    //       id: user.id,
    //     }
    //   }

    //   return token
    // }
  },


})