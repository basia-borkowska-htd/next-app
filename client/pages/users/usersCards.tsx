import { CardComponent } from '@/components/card'
import { ContainerComponent } from '@/components/container'

interface UsersCardsProps {
  users: JSX.Element[]
  onClick: () => void
}

export const UsersCards = ({ users, onClick }: UsersCardsProps) => (
  <ContainerComponent className="flex h-screen items-center">
    <div className="w-full flex flex-wrap gap-6 justify-center">
      {users}
      <CardComponent className="bg-green-300/25 hover:bg-green-300/30" onClick={onClick}>
        <div className="text-2xl">+ Add new user</div>
      </CardComponent>
    </div>
  </ContainerComponent>
)
