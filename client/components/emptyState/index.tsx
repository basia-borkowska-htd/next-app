import Image from 'next/image'

import { useTranslate } from '@/hooks/useTranslate'

import EmptyStateCat from '@/assets/graphics/empty-state-cat.svg'

interface EmptyStateProps {
  title?: string
  message?: string
  compact?: boolean
}
export const EmptyStateComponent = ({ title, message, compact = false }: EmptyStateProps) => {
  const { t } = useTranslate()
  return (
    <div className={`flex flex-col items-center ${compact ? 'gap-4 mb-6' : 'h-screen gap-5 justify-center'}`}>
      <Image height={compact ? 280 : 580} src={EmptyStateCat} alt="Empty state cat" />
      <strong className={`${compact ? 'text-3xl' : 'text-6xl'}`}>{title || t('empty_state.title')}</strong>
      <strong className={`${compact ? 'text-xl' : 'text-4xl'}`}>{message || t('empty_state.message')}</strong>
    </div>
  )
}
