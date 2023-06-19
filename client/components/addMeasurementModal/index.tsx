import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { ModalComponent } from '../modal'
import { ButtonComponent } from '../button'
import { MeasurementType } from '@/types/Measurement'
import { UnitEnum } from '@/enums/Unit.enum'

interface AddMeasurementModalProps {
  userId: string
  opened: boolean
  loading: boolean

  onClose: () => void
  onSubmit: (measurement: MeasurementType) => void
}

export const AddMeasurementModalComponent = ({
  userId,
  opened,
  loading,
  onClose,
  onSubmit,
}: AddMeasurementModalProps) => {
  const form = useForm({
    initialValues: {
      // TODO do not show 0
      weight: {
        value: 0,
        unit: UnitEnum.KILOS,
      },
      bodyFat: {
        value: 0,
        unit: UnitEnum.PERCENTAGE,
      },
      visceralFat: {
        value: 0,
        unit: UnitEnum.NO_UNIT,
      },
      muscles: {
        value: 0,
        unit: UnitEnum.KILOS,
      },
      protein: {
        value: 0,
        unit: UnitEnum.PERCENTAGE,
      },
      water: {
        value: 0,
        unit: UnitEnum.PERCENTAGE,
      },
      boneTissue: {
        value: 0,
        unit: UnitEnum.KILOS,
      },
      BMI: {
        value: 0,
        unit: UnitEnum.NO_UNIT,
      },
      BMR: {
        value: 0,
        unit: UnitEnum.KCAL,
      },
      metabolicAge: {
        value: 0,
        unit: UnitEnum.NO_UNIT,
      },
    },

    validate: {
      weight: ({ value }) => {
        if (!value) return null
        return value > 29 && value < 301 ? null : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
      },
    },
  })

  return (
    <ModalComponent opened={opened} onClose={onClose} title="Add New Measurement">
      <form onSubmit={form.onSubmit((values) => onSubmit({ _id: '', userId, ...values }))}>
        <TextInput
          mt="sm"
          mb="xl"
          label="Weight"
          placeholder="Weight"
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>}
          {...form.getInputProps('weight.value')}
        />
        <TextInput
          mt="sm"
          mb="xl"
          label="Body Fat"
          placeholder="Body Fat"
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>}
          {...form.getInputProps('bodyFat.value')}
        />
        <TextInput
          mt="sm"
          mb="xl"
          label="Visceral Fat"
          placeholder="Visceral Fat"
          {...form.getInputProps('visceralFat.value')}
        />
        <TextInput
          mt="sm"
          mb="xl"
          label="Muscles"
          placeholder="Muscles"
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>}
          {...form.getInputProps('muscles.value')}
        />
        <TextInput
          mt="sm"
          mb="xl"
          label="Protein"
          placeholder="Protein"
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>}
          {...form.getInputProps('protein.value')}
        />
        <TextInput
          mt="sm"
          mb="xl"
          label="Water"
          placeholder="Water"
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>}
          {...form.getInputProps('water.value')}
        />
        <TextInput
          mt="sm"
          mb="xl"
          label="Bone Tissue"
          placeholder="Bone Tissue"
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>}
          {...form.getInputProps('boneTissue.value')}
        />
        <TextInput mt="sm" mb="xl" label="BMI" placeholder="BMI" {...form.getInputProps('BMI.value')} />
        <TextInput
          mt="sm"
          mb="xl"
          label="BMR"
          placeholder="BMR"
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.KCAL}</p>}
          {...form.getInputProps('BMR.value')}
        />
        <TextInput
          mt="sm"
          mb="xl"
          label="Metabolic Age"
          placeholder="Metabolic Age"
          {...form.getInputProps('metabolicAge.value')}
        />
        <ButtonComponent loading={loading} type="submit" variant="gradient">
          Submit
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}
