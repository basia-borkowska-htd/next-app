import { Card, Center, Stepper, Title } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { ButtonComponent } from '@/components/button'

import { useTranslate } from '@/hooks/useTranslate'

import Logo from '@/assets/graphics/logo.svg'

const VerifyEmailPage = () => {
  const { t } = useTranslate()
  const { data: session } = useSession()

  return (
    <div className="bg-green-100/10 flex items-center justify-center h-screen">
      <Card shadow="md" padding="lg" radius="md" className="h-fit w-1/2">
        <div className="flex flex-col items-center gap-1 py-4">
          <Image src={Logo} alt="Logo" />
          <Title color="blue-300">{t('basic.title')}</Title>
        </div>
        <div className="my-4 pb-4">
          <Stepper size="sm" active={1} color="green-100">
            <Stepper.Step label="Step 1" description="Create an account" />
            <Stepper.Step label="Step 2" description="Verify email" />
            <Stepper.Step label="Step 3" description="Complete profile" />
          </Stepper>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg text-center font-bold">{`We're happy you decided to join Next App!`}</div>
          <div className="text-center">{`We've sent an email to ${session.account.email} to verify your email address and activate your account.`}</div>
          <div className="mt-3">{`Didn't recieve an email?`}</div>
          <ButtonComponent fullWidth={false} variant="outline">
            Resend verification email
          </ButtonComponent>
        </div>
      </Card>
    </div>
  )
}
export default VerifyEmailPage
