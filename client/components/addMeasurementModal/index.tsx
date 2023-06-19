import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { ModalComponent } from '@/components/modal'
import { ButtonComponent } from '@/components/button'
import { MeasurementType } from '@/types/Measurement'

import { initialValues, inputValues } from './helpers'

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
    initialValues,
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
        {Object.keys(inputValues).map((key: string) => (
          <TextInput
            mt="sm"
            mb="xl"
            label={inputValues[key].label}
            placeholder={inputValues[key].placeholder}
            rightSection={inputValues[key].rightSection}
            {...form.getInputProps(`${inputValues[key].value}.value`)}
          />
        ))}
        <ButtonComponent loading={loading} type="submit" variant="gradient">
          Submit
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}
