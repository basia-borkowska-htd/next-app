import { ButtonComponent } from '../button'
import { IconComponent } from './icon'

interface IconBadgeProps {
  iconName: string
  title: string
  clicked: boolean

  onClick: (clicked: boolean) => void
}
export const IconBadgeComponent = ({ iconName, title, clicked, onClick }: IconBadgeProps) => (
  <ButtonComponent
    variant="icon"
    className={`flex gap-2 items-center w-fit h-10 px-1 ${
      clicked ? 'bg-green-100 font-bold' : 'bg-blue-300/10'
    } rounded-full cursor-pointer`}
    onClick={() => onClick(!clicked)}
    leftIcon={<IconComponent iconName={iconName} />}
  >
    <div className="pe-4 text-blue-300">{title}</div>
  </ButtonComponent>
)
