import { Card, Title } from '@mantine/core'
import { IconBrandFacebookFilled, IconBrandGoogle, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth/next'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'

import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { ButtonComponent } from '@/components/button'

import Logo from '@/assets/graphics/logo.svg'

import { Pathnames } from '@/utils/pathnames'

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) return { redirect: { destination: Pathnames.home } }

  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] },
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

const SignInPage = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <div className="bg-green-100/10 flex items-center justify-center h-screen">
    <Card shadow="md" padding="lg" radius="md" className="h-fit w-3/12">
      <div className="flex flex-col items-center gap-1 py-4">
        <Image src={Logo} alt="Logo" />
        <Title color="blue-300">Next App</Title>
      </div>
      <div className="flex flex-col gap-2">
        {Object.values(providers).map(({ id, name }) => (
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
