import dynamic from 'next/dynamic'

import { MeasurementEnum } from '@/enums/Measurement.enum'

const AccordionComponent = dynamic(() =>
  import('@/components/common/accordion').then((components) => components.AccordionComponent),
)
const ContainerComponent = dynamic(() =>
  import('@/components/common/container').then((components) => components.ContainerComponent),
)

const ChartItemComponent = dynamic(() => import('./chartItem').then((components) => components.ChartItemComponent))

interface ChartsTabProps {
  userId: string
}
export const ChartsTabComponent = ({ userId }: ChartsTabProps) => {
  const keys = Object.values(MeasurementEnum) as Array<MeasurementEnum>

  return (
    <ContainerComponent>
      <AccordionComponent defaultOpened={keys}>
        {keys.map((key) => (
          <ChartItemComponent key={key} itemKey={key} userId={userId} />
        ))}
      </AccordionComponent>
    </ContainerComponent>
  )
}
