import { ReactNode } from 'react'

import { EmptyStateComponent } from '@/components/emptyState'
import { ErrorComponent } from '@/components/error'
import { PageLoaderComponent } from '@/components/pageLoader'

interface PanelProps {
  isLoading: boolean
  error: boolean
  invalidData: boolean
  invalidDataMessage: string
  children: ReactNode
}

export const PanelComponent = ({ isLoading, error, invalidData, invalidDataMessage, children }: PanelProps) => {
  if (isLoading) return <PageLoaderComponent compact />
  if (error) return <ErrorComponent compact />
  if (invalidData) return <EmptyStateComponent title={invalidDataMessage} compact />

  return children
}
