import { api } from '@/api'
import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import InstagramProvider from 'next-auth/providers/instagram'
import LinkedInProvider from 'next-auth/providers/linkedin'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const user = await api.auth.authenticate(credentials)

        if (user) {
          return { id: user._id, name: user.name, email: user.email }
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null
      },
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
