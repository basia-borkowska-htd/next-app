import ErrorRobot from '@/assets/graphics/error-robot.svg'
import Image from 'next/image'
interface ErrorProps {
  title?: string
  message?: string
  secondaryMessage?: string
  compact?: boolean
}
export const ErrorComponent = ({
  title = 'Error',
  message = 'Oh no! Something went wrong.',
  secondaryMessage = 'Please try reloading the page and repeating this action.',
  compact = false,
}: ErrorProps) => {
  const n = compact ? 2 : 3
  return (
    <div className={`h-screen flex flex-col items-center justify-center gap-${n + 2}`}>
      <Image height={compact ? 280 : 580} src={ErrorRobot} alt="Random image" />
      <strong className={`text-${n + 4}xl`}>{title}</strong>
      <strong className={`text-${n + 2}xl`}>{message}</strong>
      <strong className={`text-${n}xl`}>{secondaryMessage}</strong>
    </div>
  )
}
