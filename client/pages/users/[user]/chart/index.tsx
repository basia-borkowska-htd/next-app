import { api } from '@/api'
import { useTranslate } from '@/hooks/useTranslate'
import { useQuery } from '@tanstack/react-query'

import { ChartComponent } from '@/components/chart'
import { ContainerComponent } from '@/components/container'
import { EmptyStateComponent } from '@/components/emptyState'
import { ErrorComponent } from '@/components/error'
import { PageLoaderComponent } from '@/components/pageLoader'

import { MeasurementEnum } from '@/enums/Measurement.enum'

interface ChartSectionProps {
  userId: string
}

export const ChartSectionComponent = ({ userId }: ChartSectionProps) => {
  const { t } = useTranslate()
  const {
    data: chart,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [MeasurementEnum.WEIGHT, userId],
    queryFn: () => api.measurement.getChartMeasurements(userId, MeasurementEnum.WEIGHT),
  })

  if (error) return <ErrorComponent title={error.toString()} compact />
  if (isLoading || isFetching) return <PageLoaderComponent compact />

  return (
    <ContainerComponent className="mt-8">
      <div className="mb-4 font-bold text-xl">{t('user.chart.title')}</div>
      <div className="flex justify-center mb-8">
        {chart.length ? (
          <ChartComponent data={chart} />
        ) : (
          <EmptyStateComponent
            title={t('user.chart.empty_state.title')}
            message={t('user.chart.empty_state.message')}
            compact
          />
        )}
      </div>
    </ContainerComponent>
  )
}
