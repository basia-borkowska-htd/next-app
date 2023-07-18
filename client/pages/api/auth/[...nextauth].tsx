import { api } from '@/api'
import NextAuth from 'next-auth'
import type { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt/types'
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
        const account = await api.auth.authenticate(credentials)

        if (account) {
          return { id: account._id, email: credentials.email, account }
        }
        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signIn',
    error: '/auth/signIn',
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user?.account) return { ...token, account: user?.account }
      return token
    },
    async session({ session, token }): Promise<Session> {
      return { ...session, account: token.account }
    },
  },
}
export default NextAuth(authOptions)
