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
        const { account, token } = await api.auth.authenticate(credentials)

        if (account) {
          return { id: account._id, email: credentials.email, beToken: token }
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signIn',
    error: '/auth/signIn',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }): Promise<JWT> {
      console.log({ token, user, account, profile, isNewUser })
      return token
    },
    async session({ session, user, token }): Promise<Session> {
      // console.log({ session, user, token })
      // console.log(token.status)
      // console.log({ session, token })
      return session
    },
  },
}
export default NextAuth(authOptions)
