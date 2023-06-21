import { AvatarComponent } from '@/components/avatar'
import { ButtonComponent } from '@/components/button'
import { GoBackComponent } from '@/components/goBack'
import { Pathnames } from '@/utils/pathnames'

interface HeaderProps {
  userId: string
  userName: string
  userAvatar?: string

  openModal: () => void
}
export const HeaderComponent = ({ userId, userName, userAvatar, openModal }: HeaderProps) => (
  <div className="mb-8">
    <GoBackComponent path={Pathnames.userProfile.replace(':id', userId)} />
    <div className="flex items-center justify-between">
      <AvatarComponent src={userAvatar} name={userName} compact />
      <ButtonComponent className="basis-2/6" variant="outline" onClick={openModal}>
        Add new measurement
      </ButtonComponent>
    </div>
  </div>
)
