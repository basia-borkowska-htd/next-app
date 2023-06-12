import { AvatarComponent } from '@/components/avatar'
import BasiaImg from '@/assets/images/basia.jpeg'
import { Button, Container } from '@mantine/core'
import { UserType } from '@/types/User'
import { useDisclosure } from '@mantine/hooks'
import { UserModalComponent } from '@/components/userModal'

interface HeaderProps {
  user: UserType

  onEdit: (user: UserType) => void
}
export const HeaderComponent = ({ user, onEdit }: HeaderProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { name, age, sex, height, weight } = user

  return (
    <Container className="flex justify-between items-center mt-8">
      <div className="basis-1/8">
        <AvatarComponent src={BasiaImg.src} />
      </div>
      <div className="basis-1/8">
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Sex: {sex}</p>
        <p>Height: {height / 100} m</p>
        <p>Weight: {weight ? `${weight} kg` : '-'}</p>
      </div>
      <div className="basis-3/4 flex justify-end">
        <Button variant="gradient" gradient={{ from: 'pink', to: 'peach', deg: 35 }} onClick={open}>
          Edit
        </Button>
      </div>

      <UserModalComponent opened={opened} user={user} onClose={close} onSubmit={onEdit} />
    </Container>
  )
}
