import { CardComponent } from '@/components/card'
import { UserModalComponent } from '@/components/userModal'
import { Pathnames } from '@/utils/pathnames'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'

import { useMutation, useQuery } from '@tanstack/react-query'
import { PageLoaderComponent } from '@/components/pageLoader'

import { notify } from '@/utils/notifications'
import { ErrorComponent } from '@/components/error'
import { api } from '@/api'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'
import { queryClient } from '@/pages/_app'
import { ContainerComponent } from '@/components/container'
import { AvatarComponent } from '@/components/avatar'

const UsersPage = () => {
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading } = useQuery({ queryKey: [QueryKeyEnum.USERS], queryFn: api.user.getUsers })

  const addUserMutation = useMutation({
    mutationFn: api.user.addUser,
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
    <ContainerComponent className="flex h-screen items-center bg-green-100/10">
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
  )
}

export default UsersPage
