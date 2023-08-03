import { api } from '@/api'
import { Card, Title } from '@mantine/core'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { ButtonComponent } from '@/components/common/button'
import { ErrorMessageComponent } from '@/components/common/errorMessage'
import { UserFormComponent } from '@/components/common/forms/userForm'

import { useTranslate } from '@/hooks/useTranslate'

import { AddUserType } from '@/types/User'

import { StepEnum } from '@/enums/Step.enum'

import Logo from '@/assets/graphics/logo.svg'

import { customSignOut } from '@/utils/customSignOut'
import { Pathnames } from '@/utils/pathnames'

import RegistrationStepperComponent from '../RegistrationStepper'

const CompleteProfilePage = () => {
  const { t } = useTranslate()
  const { data: session } = useSession()
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (addUser: AddUserType) => {
    if (!session?.account?._id) return
    try {
      const { status } = await api.auth.completeProfile(session.account._id, addUser)
      session.account.status = status
      router.push(Pathnames.home)
    } catch (e) {
      setError(e.message.toString())
    }
  }

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
        <RegistrationStepperComponent active={StepEnum.STEP_3} />
        {error && <ErrorMessageComponent>{error}</ErrorMessageComponent>}
        <UserFormComponent email={session?.account?.email} loading={false} onSubmit={handleSubmit} />
      </Card>
    </div>
  )
}

export default CompleteProfilePage
