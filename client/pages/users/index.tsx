import { CardComponent } from '@/components/card'
import { UserModalComponent } from '@/components/userModal'
import { useUsers } from '@/hooks/useUsers'
import { UserType } from '@/types/User'
import { Pathnames } from '@/utils/pathnames'
import { Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const UsersPage = () => {
  const { users, getUsers, addUser } = useUsers()
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    getUsers()
  }, [])

  if (!users || users.length === 0) return <div>loading</div>

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }

  return (
    <Container size="xl" className="flex h-screen items-center">
      <div className="w-full flex flex-wrap gap-6 justify-between">
        {users.map(({ _id, name }) => (
          <CardComponent onClick={() => handleRedirect(_id)} key={_id} title={name} />
        ))}
        <CardComponent onClick={open} title="+ Add new user" />
      </div>

      <UserModalComponent opened={opened} onClose={close} onSubmit={addUser} />
    </Container>
  )
}

export default UsersPage
