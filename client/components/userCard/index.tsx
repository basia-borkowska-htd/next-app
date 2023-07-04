import { AvatarComponent } from '@/components/avatar'
import { CardComponent } from '@/components/card'

interface UserCardProps {
  _id: string
  avatarUrl: string
  name: string
  handleClick: () => void
}

export const UserCardComponent = ({ _id, avatarUrl, name, handleClick }: UserCardProps) => (
  <CardComponent key={`card-${_id}`} onClick={handleClick}>
    <AvatarComponent src={avatarUrl} compact />
    <div className="text-2xl">{name}</div>
  </CardComponent>
)
