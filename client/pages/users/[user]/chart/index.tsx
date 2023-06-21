import { api } from '@/api'
import { ChartComponent } from '@/components/chart'
import { ContainerComponent } from '@/components/container'
import { EmptyStateComponent } from '@/components/emptyState'
import { ErrorComponent } from '@/components/error'
import { PageLoaderComponent } from '@/components/pageLoader'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'
import { UnitEnum } from '@/enums/Unit.enum'
import { useQuery } from '@tanstack/react-query'

interface ChartSectionProps {
  userId: string
}

export const ChartSectionComponent = ({ userId }: ChartSectionProps) => {
  const {
    data: chart,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.WEIGHT_CHART],
    queryFn: () => api.measurement.getChartMeasurements(userId, 'weight'),
  })

  if (error) return <ErrorComponent title={error.toString()} compact />
  if (isLoading) return <PageLoaderComponent compact />
  if (!chart) return <EmptyStateComponent title="No weights data available" compact />
  return (
    <ContainerComponent className="mt-8">
      <div className="mb-4 font-bold text-xl">Weight Chart</div>
      <div className="flex justify-center mb-8">
        <ChartComponent data={chart} />
      </div>
    </ContainerComponent>
  )
}
