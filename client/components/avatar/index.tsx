import { Avatar } from '@mantine/core'

interface AvatarProps {
  src?: string
}

export const AvatarComponent = ({ src }: AvatarProps) => (
  <Avatar src={src} alt="avatar" color="indigo" radius="lg" size="xl" />
)
