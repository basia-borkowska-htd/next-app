import { AvatarComponent } from '@/components/avatar'
import { ButtonComponent } from '@/components/button'

interface HeaderProps {
  userName: string
  userAvatar?: string
  openModal: () => void
}
const HeaderComponent = ({ userName, userAvatar, openModal }: HeaderProps) => {
  return (
    <div className="basis-2/6 flex items-center justify-between mb-8">
      <AvatarComponent src={userAvatar} name={userName} compact />
      <ButtonComponent className="basis-2/6" variant="outline" onClick={openModal}>
        Add new measurement
      </ButtonComponent>
    </div>
  )
}

export default HeaderComponent
