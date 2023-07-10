import { Card, Stepper, Title } from '@mantine/core'
import Image from 'next/image'

import { useTranslate } from '@/hooks/useTranslate'

import Logo from '@/assets/graphics/logo.svg'

import { RegistrationStepperComponent } from '../RegistrationStepper'

const CompleteProfilePage = () => {
  const { t } = useTranslate()

  return (
    <div className="bg-green-100/10 flex items-center justify-center h-screen">
      <Card shadow="md" padding="lg" radius="md" className="h-fit w-1/2">
        <div className="flex flex-col items-center gap-1 py-4">
          <Image src={Logo} alt="Logo" />
          <Title color="blue-300">{t('basic.title')}</Title>
        </div>
        <RegistrationStepperComponent active={2} />
      </Card>
    </div>
  )
}
export default CompleteProfilePage
