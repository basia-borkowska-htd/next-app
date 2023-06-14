import { CardComponent } from '@/components/card'
import { UserModalComponent } from '@/components/userModal'
import { useUsers } from '@/hooks/useUsers'
import { UserType } from '@/types/User'
import { Pathnames } from '@/utils/pathnames'
import { Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'

import { useQuery, useMutation } from 'react-query'
import { PageLoaderComponent } from '@/components/PageLoader'

import { getUsers1, addUser1 } from './helpers'
import { Notifications } from '@/components/notifications'

const UsersPage = () => {
  const { users, getUsers, addUser, loading } = useUsers()
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading, refetch } = useQuery({ queryKey: ['users'], queryFn: getUsers1 })

  // Mutations
  const mutation = useMutation({
    mutationFn: addUser1,
    onSuccess: async () => {
      close()
      await refetch({
        queryKey: ['users'],
      })

      Notifications({ type: 'success', message: 'User updated successfully' })
    },
    onError: () => {
      Notifications({ type: 'error', message: 'Unable to update user' })
    },
  })

  if (isLoading) return <PageLoaderComponent />
  if (error) return <>error</>

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }

  return (
    <Container size="xl" className="flex h-screen items-center">
      <div className="w-full flex flex-wrap gap-6 justify-center">
        {data?.users.map(({ _id, name }) => (
          <CardComponent onClick={() => handleRedirect(_id)} key={_id} title={name} />
        ))}
        <CardComponent onClick={open} title="+ Add new user" bg="blue-100" />
      </div>

      <UserModalComponent
        opened={opened}
        onClose={close}
        onSubmit={(user) => mutation.mutate(user)}
        loading={loading}
      />
    </Container>
  )
}

export default UsersPage
