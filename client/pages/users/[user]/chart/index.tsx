import { ChartComponent } from '@/components/chart'
import { ContainerComponent } from '@/components/container'

export const ChartSectionComponent = () => {
  // TODO remove mocked data
  const data = [
    {
      name: '21.08',
      value: 79.9,
    },
    {
      name: '21.08',
      value: 79.8,
    },
    {
      name: '21.08',
      value: 80,
    },
    {
      name: '21.08',
      value: 77.9,
    },
    {
      name: '21.08',
      value: 76.9,
    },
  ]
  return (
    <ContainerComponent className="mt-8">
      <div className="mb-4 font-bold text-xl">Weight Chart</div>
      <div className="flex justify-center mb-8">
        <ChartComponent data={data} />
      </div>
    </ContainerComponent>
  )
}
