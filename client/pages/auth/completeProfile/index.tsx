import { Card, Stepper, Title } from '@mantine/core'
import Image from 'next/image'

import { useTranslate } from '@/hooks/useTranslate'

import Logo from '@/assets/graphics/logo.svg'

const CompleteProfilePage = () => {
  const { t } = useTranslate()

  return (
    <div className="bg-green-100/10 flex items-center justify-center h-screen">
      <Card shadow="md" padding="lg" radius="md" className="h-fit w-1/2">
        <div className="flex flex-col items-center gap-1 py-4">
          <Image src={Logo} alt="Logo" />
          <Title color="blue-300">{t('basic.title')}</Title>
        </div>
        <div className="my-4 pb-4">
          <Stepper size="sm" active={2} color="green-100">
            <Stepper.Step label="Step 1" description="Create an account" />
            <Stepper.Step label="Step 2" description="Verify email" />
            <Stepper.Step label="Step 3" description="Complete profile" />
          </Stepper>
        </div>
      </Card>
    </div>
  )
}
export default CompleteProfilePage
