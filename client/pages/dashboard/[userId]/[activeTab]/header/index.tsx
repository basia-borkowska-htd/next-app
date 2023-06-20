import { AvatarComponent } from '@/components/avatar'
import { ButtonComponent } from '@/components/button'
import { Container } from '@mantine/core'

interface HeaderProps {
  userName: string
  userAvatar?: string
  openModal: () => void
}
const HeaderComponent = ({ userName, userAvatar, openModal }: HeaderProps) => {
  return (
    <div className=" flex items-center justify-between mb-8">
      <AvatarComponent src={userAvatar} name={userName} compact />
      <ButtonComponent className="basis-2/6" variant="outline" onClick={openModal}>
        Add new measurement
      </ButtonComponent>
    </div>
  )
}

export default HeaderComponent
