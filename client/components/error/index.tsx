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
  <div className={`flex flex-col items-center ${compact ? 'gap-4 mb-6' : 'h-screen gap-5 justify-center'}`}>
    <Image height={compact ? 280 : 580} src={ErrorRobot} alt="Error robot" />
    <strong className={`${compact ? 'text-5xl' : 'text-6xl'}`}>{title}</strong>
    <strong className={`${compact ? 'text-3xl' : 'text-4xl'}`}>{message}</strong>
    <strong className={`${compact ? 'text-xl' : 'text-2xl'}`}>{secondaryMessage}</strong>
  </div>
)
