import { CardComponent } from '@/components/card'
import { UserModalComponent } from '@/components/userModal'
import { Pathnames } from '@/utils/pathnames'
import { Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'

import { useQuery, useMutation } from 'react-query'
import { PageLoaderComponent } from '@/components/pageLoader'

import { notify } from '@/utils/notifications'
import { api } from '@/api/users'
import { ErrorComponent } from '@/components/error'

const UsersPage = () => {
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading, refetch } = useQuery({ queryKey: ['users'], queryFn: api.getUsers })

  const addUserMutation = useMutation({
    mutationFn: api.addUser,
    onSuccess: async () => {
      close()
      // TODO: think about this function in case of refetching --> await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })

      await refetch({
        queryKey: ['users'],
      })
      notify({ type: 'success', message: 'User updated successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to update user' })
    },
  })

  if (isLoading) return <PageLoaderComponent />
  if (error) return <ErrorComponent />

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }
  return (
    <Container size="xl" className="flex h-screen items-center">
      <div className="w-full flex flex-wrap gap-6 justify-center">
        {data?.map(({ _id, name }) => (
          <CardComponent onClick={() => handleRedirect(_id)} key={_id} title={name} />
        ))}
        <CardComponent onClick={open} title="+ Add new user" bg="blue-100" />
      </div>

      <UserModalComponent
        opened={opened}
        onClose={close}
        onSubmit={addUserMutation.mutate}
        loading={addUserMutation.isLoading}
      />
    </Container>
  )
}

export default UsersPage
