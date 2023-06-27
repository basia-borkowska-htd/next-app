import { Accordion } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import { ChartComponent } from '@/components/chart'
import { MeasurementEnum, MeasurementLabels } from '@/enums/Measurement.enum'
import { PageLoaderComponent } from '@/components/pageLoader'
import { ErrorComponent } from '@/components/error'
import { EmptyStateComponent } from '@/components/emptyState'

interface ChartItemProps {
  userId: string
  itemKey: MeasurementEnum
}
export const ChartItemComponent = ({ userId, itemKey }: ChartItemProps) => {
  const title = MeasurementLabels[itemKey]
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
    if (!chart) return <EmptyStateComponent title={`No ${title} Measurements`} compact />

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
