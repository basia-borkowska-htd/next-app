import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PageLoaderComponent } from '@/components/pageLoader'

import { AccountStatusEnum } from '@/enums/AccountStatus.enum'

import { Pathnames } from '@/utils/pathnames'

const HomePage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.account) {
      router.push(Pathnames.auth.signIn)
    }
    console.log({ session })
    switch (session?.account?.status) {
      case AccountStatusEnum.PENDING:
        router.push(Pathnames.auth.verifyEmail)
        break
      case AccountStatusEnum.VERIFIED:
        router.push(Pathnames.auth.completeProfile)
        break
      case AccountStatusEnum.COMPLETED:
      default:
        router.push(Pathnames.users)
    }
  }, [session?.user])

  return <PageLoaderComponent />
}

export default HomePage
