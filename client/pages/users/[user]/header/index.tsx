import { AvatarComponent } from '@/components/avatar'
import BasiaImg from '@/assets/images/basia.jpeg'
import { Button, Container } from '@mantine/core'
import { UserType } from '@/types/User'

interface HeaderProps {
  user: UserType
}
export const HeaderComponent = ({ user: { name, age, sex, height, weight } }: HeaderProps) => {
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
        <p>Weight: {weight} kg</p>
      </div>
      <Button className="basis-3/4 flex justify-end" onClick={() => alert('TODO not yet implemented')}>
        Edit
      </Button>
    </Container>
  )
}
