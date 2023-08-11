import { signOut } from 'next-auth/react'

import { Pathnames } from './pathnames'
import { customStorage } from './storage'

export const customSignOut = () => {
  customStorage().removeSession()
  signOut({ callbackUrl: Pathnames.home })
}
