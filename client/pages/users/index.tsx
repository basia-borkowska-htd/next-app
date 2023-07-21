import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { ContainerComponent } from '@/components/container'
import { EmptyStateComponent } from '@/components/emptyState'
import { NavBarComponent } from '@/components/navBar'
import withPrivateRoute from '@/components/withPrivateRoute'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { Pathnames } from '@/utils/pathnames'

const ErrorComponent = dynamic(() => import('@/components/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/pageLoader').then((component) => component.PageLoaderComponent),
)

const UserCardComponent = dynamic(() =>
  import('@/components/userCard').then((component) => component.UserCardComponent),
)

const UsersPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeyEnum.USER],
    queryFn: () => api.user.getUserByEmail(session?.user?.email),
    enabled: !!session,
    retry: 1,
  })

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }

  if (isLoading) return <PageLoaderComponent />
  if (error) return <ErrorComponent title={error.toString()} />
  if (!data) return <EmptyStateComponent />

  return (
    <div className="bg-green-100/10">
      <NavBarComponent />

      {session && (
        <ContainerComponent className="flex h-screen items-center">
          <div className="w-full flex flex-wrap gap-6 justify-center">
            <UserCardComponent
              key={`user-card-${data._id}-${data.name}`}
              _id={data._id}
              avatarUrl={data.avatarUrl}
              name={data.name}
              handleClick={() => handleRedirect(data._id)}
            />
          </div>
        </ContainerComponent>
      )}
    </div>
  )
}

export default withPrivateRoute(UsersPage)
