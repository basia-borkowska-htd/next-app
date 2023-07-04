import { api } from '@/api'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { queryClient } from '@/pages/_app'

import { AddUserType } from '@/types/User'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

const ErrorComponent = dynamic(() => import('@/components/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/pageLoader').then((component) => component.PageLoaderComponent),
)
const UsersCardsComponent = dynamic(
  () => import('@/components/users/usersCards').then((component) => component.UsersCardsComponent),
  {
    loading: () => <PageLoaderComponent />,
  },
)
const UserCardComponent = dynamic(() =>
  import('@/components/userCard').then((component) => component.UserCardComponent),
)
const UserModalComponent = dynamic(() =>
  import('@/components/userModal').then((component) => component.UserModalComponent),
)

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

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }

  const memoUsersList = useMemo(
    () =>
      data?.map(({ _id, name, avatarUrl }) => (
        <UserCardComponent
          key={`user-card-${_id}-${name}`}
          _id={_id}
          avatarUrl={avatarUrl}
          name={name}
          handleClick={() => handleRedirect(_id)}
        />
      )),
    [data],
  )

  if (error) return <ErrorComponent title={error.toString()} />
  if (isLoading) return <PageLoaderComponent />

  return (
    <div className="bg-green-100/10">
      <UsersCardsComponent users={memoUsersList} onClick={open} />
      <UserModalComponent
        opened={opened}
        onClose={close}
        onSubmit={addUserMutation.mutate}
        loading={addUserMutation.isLoading}
      />
    </div>
  )
}

export default UsersPage
