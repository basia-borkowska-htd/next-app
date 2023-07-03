import { Avatar } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { IconX } from '@tabler/icons-react'

interface AvatarProps {
  src?: string
  name?: string
  compact?: boolean
  className?: string
  centered?: boolean
  removeAvatar?: () => void
}

export const AvatarComponent = ({
  src,
  name,
  compact = false,
  className = '',
  centered = true,
  removeAvatar,
}: AvatarProps) => (
  <div
    className={`flex ${centered ? 'items-center' : 'items-start'} ${
      compact ? 'flex-row gap-5' : 'flex-col gap-2'
    } ${className}`}
  >
    <div className="relative">
      <Avatar
        src={src}
        alt="avatar"
        variant="filled"
        color="green-300"
        radius={compact ? 'xl' : 'lg'}
        size={compact ? 'lg' : 'xl'}
      >
        <IconUser size={compact ? '30' : '60'} />
      </Avatar>
      {!!removeAvatar && src && (
        <IconX className="absolute top-0 right-0 text-red-600 cursor-pointer" onClick={removeAvatar} />
      )}
    </div>

    {!!name && <div className={compact ? 'text-3xl' : 'text-xl font-bold'}>{name}</div>}
  </div>
)
