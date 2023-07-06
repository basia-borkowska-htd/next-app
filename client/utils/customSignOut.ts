import { signOut } from 'next-auth/react'

import { Pathnames } from './pathnames'

export const customSignOut = () => {
  window.localStorage.clear()
  signOut({ callbackUrl: Pathnames.home })
}
