import { AccordionComponent } from '@/components/accordion'
import { ContainerComponent } from '@/components/container'
import { MeasurementEnum } from '@/enums/Measurement.enum'

import { ChartItemComponent } from './chartItem'

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
