import { Accordion } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import { ChartComponent } from '@/components/chart'
import { MeasurementEnum, MeasurementLabels } from '@/enums/Measurement.enum'
import { PanelComponent } from '@/components/panel'

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

  return (
    <Accordion.Item value={itemKey}>
      <Accordion.Control>
        <div className="font-bold">{title}</div>
      </Accordion.Control>
      <Accordion.Panel>
        <div className="flex justify-center">
          <PanelComponent
            isLoading={isFetching || isLoading}
            error={isError}
            invalidData={!chart?.length}
            invalidDataMessage={`No ${title} Measurements`}
          >
            <ChartComponent data={chart} />
          </PanelComponent>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
