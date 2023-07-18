import { signOut } from 'next-auth/react'

import { Pathnames } from './pathnames'

export const customSignOut = () => {
  signOut({ callbackUrl: Pathnames.home })
}
