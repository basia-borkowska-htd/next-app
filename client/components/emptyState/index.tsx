import EmptyStateCat from '@/assets/graphics/empty-state-cat.svg'
import Image from 'next/image'
interface EmptyStateProps {
  title?: string
  message?: string
  compact?: boolean
}
export const EmptyStateComponent = ({
  title = 'No data',
  message = 'There is nothing here yet. Come back another time!',
  compact = false,
}: EmptyStateProps) => (
  <div className={`h-screen flex flex-col items-center ${compact ? 'gap-4' : 'gap-5 justify-center'}`}>
    <Image height={compact ? 280 : 580} src={EmptyStateCat} alt="Empty state cat" />
    <strong className={`${compact ? 'text-3xl' : 'text-6xl'}`}>{title}</strong>
    <strong className={`${compact ? 'text-xl' : 'text-4xl'}`}>{message}</strong>
  </div>
)
