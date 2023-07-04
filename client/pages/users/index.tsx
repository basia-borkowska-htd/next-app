import { api } from '@/api'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { queryClient } from '@/pages/_app'

import { AvatarComponent } from '@/components/avatar'
import { CardComponent } from '@/components/card'
import { ContainerComponent } from '@/components/container'
import { ErrorComponent } from '@/components/error'
import { UserModalComponent } from '@/components/modals/userModal'
import { PageLoaderComponent } from '@/components/pageLoader'

import { AddUserType } from '@/types/User'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

const UsersPage = () => {
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading } = useQuery({ queryKey: [QueryKeyEnum.USERS], queryFn: api.user.getUsers })

  const addUserMutation = useMutation({
    mutationFn: (user: AddUserType) => api.user.addUser(user),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeyEnum.USERS] })

      notify({ type: 'success', message: 'User added successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to add user' })
    },
  })

  if (error) return <ErrorComponent title={error.toString()} />
  if (isLoading) return <PageLoaderComponent />

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }

  return (
    <div className="bg-green-100/10">
      <ContainerComponent className="flex h-screen items-center">
        <div className="w-full flex flex-wrap gap-6 justify-center">
          {data?.map(({ _id, name, avatarUrl }) => (
            <CardComponent key={`card-${_id}`} onClick={() => handleRedirect(_id)}>
              <AvatarComponent src={avatarUrl} compact />
              <div className="text-2xl">{name}</div>
            </CardComponent>
          ))}
          <CardComponent className="bg-green-300/25 hover:bg-green-300/30" onClick={open}>
            <div className="text-2xl">+ Add new user</div>
          </CardComponent>
        </div>

        <UserModalComponent
          opened={opened}
          onClose={close}
          onSubmit={addUserMutation.mutate}
          loading={addUserMutation.isLoading}
        />
      </ContainerComponent>
    </div>
  )
}

export default UsersPage
