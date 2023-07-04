import Image from 'next/image'
import Link from 'next/link'

import { ButtonComponent } from '@/components/button'

import IconArrowNarrowLeft from '@/assets/icons/arrowNarrowLeft.svg'

interface GoBackProps {
  path: string
}

export const GoBackComponent = ({ path }: GoBackProps) => (
  <Link href={path}>
    <ButtonComponent className="mb-3 ps-0" variant="icon" fullWidth={false}>
      <Image height={32} src={IconArrowNarrowLeft} alt="Go back arrow" />
    </ButtonComponent>
  </Link>
)
