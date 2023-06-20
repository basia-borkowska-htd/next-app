import { CardComponent } from '@/components/card'
import { UserModalComponent } from '@/components/userModal'
import { Pathnames } from '@/utils/pathnames'
import { Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'

import { useQuery, useMutation } from 'react-query'
import { PageLoaderComponent } from '@/components/pageLoader'

import { notify } from '@/utils/notifications'
import { ErrorComponent } from '@/components/error'
import { api } from '@/api'

const UsersPage = () => {
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading, refetch } = useQuery({ queryKey: ['users'], queryFn: api.user.getUsers })

  const addUserMutation = useMutation({
    mutationFn: api.user.addUser,
    onSuccess: async () => {
      await refetch()
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
