import { useState } from 'react'

import { ButtonComponent } from '@/components/button'

import { IconComponent } from './icon'

interface IconBadgeProps {
  iconName: string
  title: string
  clicked: boolean

  onClick: (clicked: boolean) => void
}
export const IconBadgeComponent = ({ iconName, title, clicked, onClick }: IconBadgeProps) => {
  // const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    onClick(!clicked)
    // setClicked(!clicked)
  }

  return (
    <ButtonComponent
      variant="icon"
      className={`flex gap-2 items-center w-fit h-10 px-1 ${
        clicked ? 'bg-green-100 font-bold' : 'bg-blue-300/10'
      } rounded-full cursor-pointer`}
      onClick={handleClick}
      leftIcon={<IconComponent iconName={iconName} />}
    >
      <div className="pe-4 text-blue-300">{title}</div>
    </ButtonComponent>
  )
}
