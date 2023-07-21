import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

import { ButtonComponent } from '@/components/button'
import { ContainerComponent } from '@/components/container'
import { EmptyStateComponent } from '@/components/emptyState'
import { NavBarComponent } from '@/components/navBar'
import withPrivateRoute from '@/components/withPrivateRoute'

import { useTranslate } from '@/hooks/useTranslate'

import { GroupType } from '@/types/Group'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'
import { VisibilityEnum } from '@/enums/Visibility.enum'

import { GroupComponent } from './group'

const ErrorComponent = dynamic(() => import('@/components/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/pageLoader').then((component) => component.PageLoaderComponent),
)

const UsersPage = () => {
  const { t } = useTranslate()
  const { data: session } = useSession()

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeyEnum.USER],
    queryFn: () => api.user.getUserByEmail(session?.user?.email),
    enabled: !!session,
    retry: 1,
  })

  if (isLoading) return <PageLoaderComponent />
  if (error) return <ErrorComponent title={error.toString()} />
  if (!data) return <EmptyStateComponent />

  const groupsTemp: GroupType[] = [
    {
      _id: 'string',
      name: 'B + M Foreveeeeeeeer <3 <3 <3',
      photoUrl: 'https://nextappzepp.s3.amazonaws.com/DF69ABCF-B104-4F41-8FC8-A0909A31C897.jpg',
      members: ['6492c6486b68a1a8959348b4'],
      visibility: VisibilityEnum.PRIVATE,
    },
  ]
  return (
    <div className="bg-green-100/10 h-screen">
      <NavBarComponent />
      <ContainerComponent className="flex flex-col mt-8">
        <div className="flex justify-between items-center">
          <div className="mb-8 font-bold text-xl">{t('users.my_groups')}</div>
          <ButtonComponent variant="outline" className="w-3/12">
            {t('users.create_group')}
          </ButtonComponent>
        </div>
        {groupsTemp.map((group) => (
          <GroupComponent key={group._id} group={group} />
        ))}
        <div className="mb-4 font-bold text-xl">{t('users.public_groups')}</div>
      </ContainerComponent>
    </div>
  )
}

export default withPrivateRoute(UsersPage)
