import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { ReactElement, useEffect } from 'react'

import LayoutComponent from '@/components/common/layout'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { customStorage } from '@/utils/storage'

export default (WrappedComponent) => {
  const HocComponent = (context) => {
    const { data: session } = useSession()
    const storage = customStorage()

    const { data: user } = useQuery({
      queryKey: [QueryKeyEnum.SESSION_USER],
      queryFn: () => api.user.getUserByEmail(session?.user?.email),
      enabled: !!session,
      retry: 1,
    })

    useEffect(() => {
      const doesExist = storage.getSession()
      // TODO: maybe check if user is localStorage is current user
      if (!doesExist && user) {
        storage.saveSession(JSON.stringify(user))
      }
    }, [user])

    return <WrappedComponent user={user} {...context} />
  }

  HocComponent.getLayout = (page: ReactElement) => <LayoutComponent>{page}</LayoutComponent>

  return HocComponent
}
