import { AvatarComponent } from '@/components/avatar'
import BasiaImg from '@/assets/images/basia.jpeg'
import { Divider } from '@mantine/core'
import { UserType } from '@/types/User'
import { ButtonComponent } from '@/components/button'
import { units } from '@/utils/units'
import { GoBackComponent } from '@/components/goBack'
import { Pathnames } from '@/utils/pathnames'
import { ContainerComponent } from '@/components/container'

interface HeaderProps {
  user: UserType
  openModal: () => void
  openConfirmationModal: () => void
}
export const HeaderComponent = ({ user, openModal, openConfirmationModal }: HeaderProps) => {
  const { name, age, sex, height, weight } = user

  return (
    <div>
      <ContainerComponent className="py-8">
        <GoBackComponent path={Pathnames.home} />
        <div className="flex justify-between items-center ">
          <AvatarComponent src={BasiaImg.src} name={name} />
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
              <div>{units.display(height.unit, height.value)}</div>
              <div>{weight ? units.display(weight.unit, weight.value) : '-'}</div>
            </div>
          </div>
          <div className="basis-1/4 flex justify-end flex-col items-end gap-2">
            <ButtonComponent onClick={openModal}>Edit</ButtonComponent>
            <ButtonComponent variant="outline" onClick={openConfirmationModal}>
              Delete
            </ButtonComponent>
          </div>
        </div>
      </ContainerComponent>
    </div>
  )
}
