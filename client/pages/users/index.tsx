import { CardComponent } from '@/components/Card'
import { useUsers } from '@/hooks/useUsers'
import { Container } from '@mantine/core'

const UsersPage = () => {
  const { users } = useUsers()

  if (!users || users.length === 0) return <div>loading</div>

  return (
    <Container size="xl">
      {users.map(({ _id, name }) => (
        <CardComponent key={_id} title={name} />
      ))}
    </Container>
  )
}

export default UsersPage
