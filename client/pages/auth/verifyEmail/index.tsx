import { api } from '@/api'
import { Card, Title } from '@mantine/core'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

import { ButtonComponent } from '@/components/button'
import { ErrorMessageComponent } from '@/components/errorMessage'

import { useTranslate } from '@/hooks/useTranslate'

import { StepEnum } from '@/enums/Step.enum'

import Logo from '@/assets/graphics/logo.svg'

import { customSignOut } from '@/utils/customSignOut'
import { notify } from '@/utils/notifications'

import RegistrationStepperComponent from '../RegistrationStepper'

const VerifyEmailPage = () => {
  const { t } = useTranslate()
  const { data: session } = useSession()
  const [error, setError] = useState('')

  const sendVerificationEmail = useMutation({
    mutationFn: () => api.auth.sendVerificationEmail(session.account.email),
    onSuccess: () => {
      notify({ type: 'success', message: t('auth.verify_email.resend_success') })
    },
    onError: () => {
      setError(t('auth.verify_email.resend_error'))
    },
  })

  return (
    <div className="bg-green-100/10 flex items-center justify-center h-screen">
      <Card shadow="md" padding="lg" radius="md" className="h-fit w-1/2">
        <ButtonComponent leftIcon={<IconArrowNarrowLeft />} variant="icon" onClick={customSignOut} fullWidth={false}>
          {t('auth.registration_stepper.back_to_login_page')}
        </ButtonComponent>
        <div className="flex flex-col items-center gap-1 py-4">
          <Image src={Logo} alt="Logo" />
          <Title color="blue-300">{t('basic.title')}</Title>
        </div>
        <RegistrationStepperComponent active={StepEnum.STEP_2} />
        {error && <ErrorMessageComponent>{error}</ErrorMessageComponent>}
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg text-center font-bold">{t('auth.verify_email.title')}</div>
          <div className="text-center">{t('auth.verify_email.message', { email: session?.account?.email })}</div>
          <div className="mt-3">{t('auth.verify_email.no_email_message')}</div>
          <ButtonComponent
            fullWidth={false}
            variant="outline"
            onClick={() => sendVerificationEmail.mutate()}
            loading={sendVerificationEmail.isLoading}
          >
            {t('auth.verify_email.resend_button')}
          </ButtonComponent>
        </div>
      </Card>
    </div>
  )
}
export default VerifyEmailPage
