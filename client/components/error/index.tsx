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
}: ErrorProps) => (
  <div className={`h-screen flex flex-col items-center justify-center ${compact ? 'gap-4' : 'gap-5'}`}>
    <Image height={compact ? 280 : 580} src={ErrorRobot} alt="Random image" />
    <strong className={`${compact ? 'text-5xl' : 'text-6xl'}`}>{title}</strong>
    <strong className={`${compact ? 'text-3xl' : 'text-4xl'}`}>{message}</strong>
    <strong className={`${compact ? 'text-xl' : 'text-2xl'}`}>{secondaryMessage}</strong>
  </div>
)
