import 'next-auth'

import { AccountType } from './Account'
import { UserType } from './User'

declare module 'next-auth' {
  export interface User {
    email: string
    account?: AccountType
  }
  export interface Session {
    account?: AccountType
    user: UserType
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    account?: AccountType
  }
}
