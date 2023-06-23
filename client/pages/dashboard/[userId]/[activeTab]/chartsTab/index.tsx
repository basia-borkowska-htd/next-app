import { AccordionComponent } from '@/components/accordion'
import { ContainerComponent } from '@/components/container'
import { ChartItemComponent } from './chartItem/index.tsx'
import { MeasurementEnum } from '@/enums/Measurement.enum'

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
