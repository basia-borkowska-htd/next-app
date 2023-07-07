import { Card, PasswordInput, TextInput, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { ButtonComponent } from '@/components/button'

import { useTranslate } from '@/hooks/useTranslate'

import Logo from '@/assets/graphics/logo.svg'

import { Pathnames } from '@/utils/pathnames'

// TODO: finish register page
const RegisterPage = () => {
  const { t } = useTranslate()

  return (
    <div className="bg-green-100/10 flex items-center justify-center h-screen">
      <Card shadow="md" padding="lg" radius="md" className="h-fit w-3/12">
        <div className="flex flex-col items-center gap-1 py-4">
          <Image src={Logo} alt="Logo" />
          <Title color="blue-300">{t('basic.title')}</Title>
        </div>
        <form className="flex flex-col gap-2" method="post" action="/api/auth/callback/credentials">
          <TextInput
            label={t('auth.register.email_label')}
            placeholder={t('auth.register.email_placeholder')}
            name="email"
          />
          <PasswordInput
            label={t('auth.register.password_label')}
            placeholder={t('auth.register.password_placeholder')}
            name="password"
          />
          <PasswordInput
            label={t('auth.register.confirm_password_label')}
            placeholder={t('auth.register.confirm_password_placeholder')}
            name="confirm_password"
          />
          <ButtonComponent type="submit" className="mt-5">
            {t('auth.register.button')}
          </ButtonComponent>
        </form>
        <div className="mt-3 text-sm">
          {t('auth.register.have_account')}
          <Link className="text-blue-100 font-bold" href={Pathnames.auth.signIn}>
            {t('auth.register.sign_in')}
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default RegisterPage
