import 'next-auth'

import { AccountStatusEnum } from '@/enums/AccountStatus.enum'

declare module 'next-auth' {
  export interface User {
    email: string
    beToken: string
  }
  export interface Session {
    beToken: string
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    beToken: string
  }
}
