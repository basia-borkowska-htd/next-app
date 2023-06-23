import { api } from '@/api'
import { ChartComponent } from '@/components/chart'
import { EmptyStateComponent } from '@/components/emptyState'
import { ErrorComponent } from '@/components/error'
import { PageLoaderComponent } from '@/components/pageLoader'
import { MeasurementEnum, MeasurementLabels } from '@/enums/Measurement.enum'
import { Accordion } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

interface ChartItemProps {
  userId: string
  itemKey: MeasurementEnum
}
export const ChartItemComponent = ({ userId, itemKey }: ChartItemProps) => {
  const title = MeasurementLabels[itemKey]
  const {
    data: chart,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [itemKey, userId],
    queryFn: () => api.measurement.getChartMeasurements(userId, itemKey),
  })

  const PanelComponent = () => {
    if (isFetching || isLoading) return <PageLoaderComponent compact />
    if (error) return <ErrorComponent compact />
    if (!chart?.length) return <EmptyStateComponent title={`No ${title} Measurements`} compact />

    return <ChartComponent data={chart} />
  }

  return (
    <Accordion.Item value={itemKey}>
      <Accordion.Control>
        <div className="font-bold">{title}</div>
      </Accordion.Control>
      <Accordion.Panel>
        <div className="flex justify-center">
          <PanelComponent />
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
