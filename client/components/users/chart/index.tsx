import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ResponsiveContainer } from 'recharts'

import { ChartComponent } from '@/components/chart'
import { TimePeriodSelectorComponent } from '@/components/chart/timePeriodSelector'
import { ContainerComponent } from '@/components/container'
import { EmptyStateComponent } from '@/components/emptyState'
import { ErrorComponent } from '@/components/error'
import { PageLoaderComponent } from '@/components/pageLoader'

import { useTranslate } from '@/hooks/useTranslate'

import { MeasurementEnum } from '@/enums/Measurement.enum'
import { TimePeriodEnum } from '@/enums/TimePeriod.enum'

interface ChartSectionProps {
  userId: string
}

export const ChartSectionComponent = ({ userId }: ChartSectionProps) => {
  const { t } = useTranslate()
  const [period, setPeriod] = useState(TimePeriodEnum.LAST_30_DAYS)

  const {
    data: chart,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [MeasurementEnum.WEIGHT, userId, period],
    queryFn: () => api.measurement.getChartMeasurements(userId, MeasurementEnum.WEIGHT, period),
  })

  const getChartComponent = () => {
    if (error) return <ErrorComponent title={error.toString()} compact />
    if (isLoading || isFetching)
      return (
        <ResponsiveContainer className="flex items-center justify-center" width="60%" height={400}>
          <PageLoaderComponent compact />
        </ResponsiveContainer>
      )
    if (!chart.length)
      return (
        <EmptyStateComponent
          title={t('user.chart.empty_state.title')}
          message={t('user.chart.empty_state.message')}
          compact
        />
      )

    return <ChartComponent data={chart} />
  }

  return (
    <ContainerComponent className="mt-8">
      <div className="mb-4 font-bold text-xl">{t('user.chart.title')}</div>
      <div className="mb-8">
        <div className="flex justify-around items-center">
          {getChartComponent()}
          <TimePeriodSelectorComponent period={period} setPeriod={setPeriod} />
        </div>
      </div>
    </ContainerComponent>
  )
}
