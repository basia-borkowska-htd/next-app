import { Avatar } from '@mantine/core'

interface AvatarProps {
  src?: string
  name?: string
}

export const AvatarComponent = ({ src, name }: AvatarProps) => (
  <div className="flex flex-col items-center gap-2">
    <Avatar src={src} alt="avatar" color="indigo" radius="lg" size="xl" />
    <strong className="text-xl">{name}</strong>
  </div>
)
