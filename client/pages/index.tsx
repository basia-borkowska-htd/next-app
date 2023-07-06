import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PageLoaderComponent } from '@/components/pageLoader'

import { zeppLocalStorage } from '@/utils/localStorage'
import { Pathnames } from '@/utils/pathnames'

const HomePage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      zeppLocalStorage().updateSession('session', { ...session, auth: true })
      router.push(Pathnames.users)
    } else {
      router.push(Pathnames.auth)
    }
  }, [session?.user])

  return <PageLoaderComponent />
}

export default HomePage
