import { Avatar } from '@mantine/core'

interface AvatarProps {
  src?: string
  name?: string
  compact?: boolean
}

export const AvatarComponent = ({ src, name, compact = false }: AvatarProps) => (
  <div className={`flex  items-center  ${compact ? 'flex-row gap-5' : 'flex-col gap-2'} `}>
    <Avatar src={src} alt="avatar" color="indigo" radius={compact ? 'xl' : 'lg'} size={compact ? 'lg' : 'xl'} />
    {!!name && <div className={compact ? 'text-3xl' : 'text-xl font-bold'}>{name}</div>}
  </div>
)
