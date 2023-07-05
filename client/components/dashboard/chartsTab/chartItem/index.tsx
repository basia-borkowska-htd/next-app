import { api } from '@/api'
import { Accordion } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { useTranslate } from '@/hooks/useTranslate'

import { MeasurementEnum, getMeasurementLabel } from '@/enums/Measurement.enum'

const ErrorComponent = dynamic(() => import('@/components/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/pageLoader').then((component) => component.PageLoaderComponent),
)
const EmptyStateComponent = dynamic(() =>
  import('@/components/emptyState').then((component) => component.EmptyStateComponent),
)
const ChartComponent = dynamic(() => import('@/components/chart').then((component) => component.ChartComponent))

interface ChartItemProps {
  userId: string
  itemKey: MeasurementEnum
}
export const ChartItemComponent = ({ userId, itemKey }: ChartItemProps) => {
  const { t } = useTranslate()
  const title = getMeasurementLabel(itemKey, t)
  const {
    data: chart,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [itemKey, userId],
    queryFn: () => api.measurement.getChartMeasurements(userId, itemKey),
  })

  const getPanelComponent = () => {
    if (isLoading || isFetching) return <PageLoaderComponent compact />
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
        <div className="flex justify-center">{getPanelComponent()}</div>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
