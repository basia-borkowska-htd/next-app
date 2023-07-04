import { Avatar } from '@mantine/core'
import Image from 'next/image'

import UserIcon from '@/assets/icons/user.svg'

interface AvatarProps {
  src?: string
  name?: string
  compact?: boolean
  className?: string
  centered?: boolean
}

export const AvatarComponent = ({ src, name, compact = false, className = '', centered = true }: AvatarProps) => (
  <div
    className={`flex ${centered ? 'items-center' : 'items-start'} ${
      compact ? 'flex-row gap-5' : 'flex-col gap-2'
    } ${className}`}
  >
    <Avatar
      src={src}
      alt="avatar"
      variant="filled"
      color="green-300"
      radius={compact ? 'xl' : 'lg'}
      size={compact ? 'lg' : 'xl'}
    >
      <Image height={compact ? 30 : 50} src={UserIcon} alt="Error robot" />
    </Avatar>

    {!!name && <div className={compact ? 'text-3xl' : 'text-xl font-bold'}>{name}</div>}
  </div>
)
