import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signIn',
  },
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
