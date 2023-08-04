import { api } from '@/api'
import { Accordion } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ResponsiveContainer } from 'recharts'

import { TimePeriodSelectorComponent } from '@/components/common/chart/timePeriodSelector'

import { useTranslate } from '@/hooks/useTranslate'

import { MeasurementEnum, getMeasurementLabel } from '@/enums/Measurement.enum'
import { TimePeriodEnum } from '@/enums/TimePeriod.enum'

const ErrorComponent = dynamic(() => import('@/components/common/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/common/pageLoader').then((component) => component.PageLoaderComponent),
)
const EmptyStateComponent = dynamic(() =>
  import('@/components/common/emptyState').then((component) => component.EmptyStateComponent),
)
const ChartComponent = dynamic(() => import('@/components/common/chart').then((component) => component.ChartComponent))

interface ChartItemProps {
  userId: string
  itemKey: MeasurementEnum
}
export const ChartItemComponent = ({ userId, itemKey }: ChartItemProps) => {
  const { t } = useTranslate()
  const title = getMeasurementLabel(itemKey, t)

  const [period, setPeriod] = useState(TimePeriodEnum.LAST_30_DAYS)
  const {
    data: chart,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [itemKey, userId, period],
    queryFn: () => api.measurement.getChartMeasurements(userId, itemKey, period),
  })

  const getPanelComponent = () => {
    if (isLoading || isFetching)
      return (
        <ResponsiveContainer className="flex items-center justify-center" width="60%" height={400}>
          <PageLoaderComponent compact />
        </ResponsiveContainer>
      )

    if (isError) return <ErrorComponent compact />
    if (!chart.length) return <EmptyStateComponent compact />
    return <ChartComponent data={chart} />
  }

  return (
    <Accordion.Item value={itemKey}>
      <Accordion.Control>
        <div className="font-bold">{title}</div>
      </Accordion.Control>
      <Accordion.Panel>
        <div className="flex justify-around items-center">
          {getPanelComponent()}
          <TimePeriodSelectorComponent period={period} setPeriod={setPeriod} />
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
