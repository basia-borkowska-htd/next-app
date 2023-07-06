import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //   callbacks: {
  //     async signIn({ user, account, profile, email, credentials }) {
  //       return true
  //     },
  //     async redirect({ url, baseUrl }) {
  //       return baseUrl
  //     },
  //     async session({ session, user, token }) {
  //       // console.log('session')

  //       return session
  //     },
  //     async jwt({ token, user, account, profile, isNewUser }) {
  //       return token
  //     },
  //   },
}
export default NextAuth(authOptions)
