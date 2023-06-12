import { AvatarComponent } from '@/components/avatar'
import BasiaImg from '@/assets/images/basia.jpeg'
import { Button, Container } from '@mantine/core'
import { UserType } from '@/types/User'

interface HeaderProps {
  user: UserType
  openModal: () => void
}
export const HeaderComponent = ({ user, openModal }: HeaderProps) => {
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
        <Button variant="gradient" gradient={{ from: 'pink', to: 'peach', deg: 35 }} onClick={openModal}>
          Edit
        </Button>
      </div>
    </Container>
  )
}
