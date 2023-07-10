import { api } from '@/api'
import { Card, Title } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { ButtonComponent } from '@/components/button'

import { useTranslate } from '@/hooks/useTranslate'

import Logo from '@/assets/graphics/logo.svg'

import { Pathnames } from '@/utils/pathnames'

import { RegistrationStepperComponent } from '../RegistrationStepper'

const VerifyEmailPage = () => {
  const { t } = useTranslate()
  const { data: session } = useSession()
  const router = useRouter()

  const handleClick = async () => {
    const account = await api.auth.verifyEmail(session.account._id)
    session.account = account
    router.push(Pathnames.auth.completeProfile)
  }

  return (
    <div className="bg-green-100/10 flex items-center justify-center h-screen">
      <Card shadow="md" padding="lg" radius="md" className="h-fit w-1/2">
        <div className="flex flex-col items-center gap-1 py-4">
          <Image src={Logo} alt="Logo" />
          <Title color="blue-300">{t('basic.title')}</Title>
        </div>
        <RegistrationStepperComponent active={1} />
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg text-center font-bold">{t('auth.verify_email.title')}</div>
          <div className="text-center">{t('auth.verify_email.message', { email: session?.account?.email })}</div>
          <div className="mt-3">{t('auth.verify_email.no_email_message')}</div>
          <ButtonComponent fullWidth={false} variant="outline" onClick={handleClick}>
            {t('auth.verify_email.resend_button')}
          </ButtonComponent>
        </div>
      </Card>
    </div>
  )
}
export default VerifyEmailPage
