import { AvatarComponent } from '@/components/avatar'
import BasiaImg from '@/assets/images/basia.jpeg'
import { Button, Container, Divider } from '@mantine/core'
import { UserType } from '@/types/User'

interface HeaderProps {
  user: UserType
  openModal: () => void
  openConfirmationModal: () => void
}
export const HeaderComponent = ({ user, openModal, openConfirmationModal }: HeaderProps) => {
  const { name, age, sex, height, weight } = user

  return (
    <div>
      <Container className="flex justify-between items-center py-8">
        <div className="basis-1/8 flex flex-col items-center gap-2">
          <AvatarComponent src={BasiaImg.src} />
          <strong className="text-xl">{name}</strong>
        </div>
        <div className="basis-1/2 flex ms-10">
          <div className="flex flex-col me-5">
            <strong>Age</strong>
            <strong>Sex</strong>
            <strong>Height</strong>
            <strong>Weight</strong>
          </div>
          <Divider mx="xl" size="xs" orientation="vertical" />
          <div className="flex flex-col ms-5">
            <div>{age}</div>
            <div>{sex}</div>
            <div>{height / 100} m</div>
            <div>{weight ? `${weight} kg` : '-'}</div>
          </div>
        </div>
        <div className="basis-1/4 flex justify-end flex-col items-end gap-2">
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: 'blue-200', to: 'green-100', deg: 35 }}
            onClick={openModal}
          >
            Edit
          </Button>
          <Button fullWidth variant="outline" color="blue-200" onClick={openConfirmationModal}>
            Delete
          </Button>
        </div>
      </Container>
    </div>
  )
}
