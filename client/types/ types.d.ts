import 'next-auth'

import { AccountType } from './Account'

declare module 'next-auth' {
  export interface User {
    email: string
    account?: AccountType
  }
  export interface Session {
    account?: AccountType
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    account?: AccountType
  }
}
