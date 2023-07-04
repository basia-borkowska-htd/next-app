import { useTranslate } from '@/hooks/useTranslate'
import { Divider } from '@mantine/core'

import { AvatarComponent } from '@/components/avatar'
import { ButtonComponent } from '@/components/button'
import { ContainerComponent } from '@/components/container'
import { GoBackComponent } from '@/components/goBack'

import { UserType } from '@/types/User'

import { Pathnames } from '@/utils/pathnames'
import { units } from '@/utils/units'

interface HeaderProps {
  user: UserType

  openModal: () => void
}
export const HeaderComponent = ({ user, openModal }: HeaderProps) => {
  const { t } = useTranslate()
  const { name, age, sex, height, weight, avatarUrl } = user

  return (
    <div className="bg-green-100/10 shadow-md mb-8">
      <ContainerComponent className="py-8">
        <GoBackComponent path={Pathnames.home} />
        <div className="flex justify-between items-center ">
          <AvatarComponent src={avatarUrl} name={name} />
          <div className="basis-1/2 flex ms-10">
            <div className="flex flex-col me-5">
              <strong>{t('user.header.age')}</strong>
              <strong>{t('user.header.sex')}</strong>
              <strong>{t('user.header.height')}</strong>
              <strong>{t('user.header.weight')}</strong>
            </div>
            <Divider mx="xl" size="xs" orientation="vertical" />
            <div className="flex flex-col ms-5">
              <div>{age}</div>
              <div>{sex}</div>
              <div>{units.display(height.unit, height.value)}</div>
              <div>{weight ? units.display(weight.unit, weight.value) : '-'}</div>
            </div>
          </div>
          <div className="basis-1/4">
            <ButtonComponent onClick={openModal}>{t('user.header.edit_button')}</ButtonComponent>
          </div>
        </div>
      </ContainerComponent>
    </div>
  )
}
