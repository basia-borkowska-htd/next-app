import { CardComponent } from '@/components/card'
import { UserModalComponent } from '@/components/userModal'
import { useUsers } from '@/hooks/useUsers'
import { UserType } from '@/types/User'
import { Pathnames } from '@/utils/pathnames'
import { Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Loader } from '@mantine/core'
import { PageLoaderComponent } from '@/components/PageLoader'
const UsersPage = () => {
  const { users, getUsers, addUser, loading } = useUsers()
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    getUsers()
  }, [])

  if (!users || users.length === 0) return <PageLoaderComponent />

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }
  const handleSubmit = async (user: UserType) => {
    const result = await addUser(user)
    if (result) {
      close()
      getUsers()
      notifications.show({
        title: 'Success',
        message: 'User updated successfully',
        color: 'green',
      })
    } else {
      notifications.show({
        title: 'Error',
        message: 'Unable to update user',
        color: 'red',
      })
    }
  }

  return (
    <Container size="xl" className="flex h-screen items-center">
      <div className="w-full flex flex-wrap gap-6 justify-center">
        {users.map(({ _id, name }) => (
          <CardComponent onClick={() => handleRedirect(_id)} key={_id} title={name} />
        ))}
        <CardComponent onClick={open} title="+ Add new user" bg="blue-100" />
      </div>

      <UserModalComponent opened={opened} onClose={close} onSubmit={handleSubmit} loading={loading} />
    </Container>
  )
}

export default UsersPage
