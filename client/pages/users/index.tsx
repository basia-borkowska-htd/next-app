import { CardComponent } from '@/components/card'
import { useUsers } from '@/hooks/useUsers'
import { Pathnames } from '@/utils/pathnames'
import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const UsersPage = () => {
  const { users, getUsers } = useUsers()
  const router = useRouter()

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
        <CardComponent onClick={() => alert('TODO: not yet implemented')} title="+ Add new user" />
      </div>
    </Container>
  )
}

export default UsersPage
