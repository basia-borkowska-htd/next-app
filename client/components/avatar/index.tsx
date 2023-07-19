import { Avatar } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'

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
    {/* TODO: remove avatar, because it still uses img component instead of next/image */}
    <Avatar
      src={src}
      alt="avatar"
      variant="filled"
      color="green-100"
      radius={compact ? 'xl' : 'lg'}
      size={compact ? 'lg' : 'xl'}
    >
      <IconUser height={compact ? 30 : 50} />
    </Avatar>

    {!!name && <div className={compact ? 'text-3xl' : 'text-xl font-bold'}>{name}</div>}
  </div>
)
