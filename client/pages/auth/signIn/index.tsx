import { Card, Divider, PasswordInput, TextInput, Title } from '@mantine/core'
import { IconBrandFacebookFilled, IconBrandGoogle, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth/next'
import { getCsrfToken, getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { ButtonComponent } from '@/components/button'

import Logo from '@/assets/graphics/logo.svg'

import { Pathnames } from '@/utils/pathnames'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) return { redirect: { destination: '/' } }

  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)

  return {
    props: { providers: providers ?? [], csrfToken },
  }
}

const getButtonIcon = (name: string) => {
  switch (name) {
    case 'Google':
      return <IconBrandGoogle size={20} stroke={4} />
    case 'Facebook':
      return <IconBrandFacebookFilled size={22} />
    case 'Instagram':
      return <IconBrandInstagram size={22} />
    case 'LinkedIn':
      return <IconBrandLinkedin size={22} />
    default:
      return null
  }
}

// TODO: Hide Credentials button better
const SignInPage = ({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <div className="bg-green-100/10 flex items-center justify-center h-screen">
    <Card shadow="md" padding="lg" radius="md" className="h-fit w-3/12">
      <div className="flex flex-col items-center gap-1 py-4">
        <Image src={Logo} alt="Logo" />
        <Title color="blue-300">Next App</Title>
      </div>
      <form className="flex flex-col gap-2" method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <TextInput label="Email" placeholder="user@example.com" name="email" />
        <PasswordInput label="Password" placeholder="*********" name="password" />
        <ButtonComponent type="submit" className="mt-5">
          Sign in
        </ButtonComponent>
      </form>
      <div className="mt-3 text-sm">
        {`Don't have an account? `}
        <Link className="text-blue-100 font-bold" href={Pathnames.auth.register}>
          Register
        </Link>
      </div>
      <Divider my="lg" label="OR" labelPosition="center" />
      <div className="flex flex-col gap-2">
        {Object.values(providers)
          .filter(({ name }) => name !== 'Credentials')
          .map(({ id, name }) => (
            <div key={name}>
              <ButtonComponent leftIcon={getButtonIcon(name)} variant="outline" key={id} onClick={() => signIn(id)}>
                Sign in with {name}
              </ButtonComponent>
            </div>
          ))}
      </div>
    </Card>
  </div>
)

export default SignInPage
