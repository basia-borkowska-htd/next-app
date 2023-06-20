import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { ModalComponent } from '@/components/modal'
import { ButtonComponent } from '@/components/button'
import { MeasurementType } from '@/types/Measurement'

import { initialValues, inputValues } from './helpers'
import { MutateOptions } from 'react-query'

interface AddMeasurementModalProps {
  userId: string
  opened: boolean
  loading: boolean

  onClose: () => void
  onSubmit: (
    measurement: MeasurementType,
    options?: MutateOptions<MeasurementType, unknown, MeasurementType, unknown>,
  ) => void
}

export const AddMeasurementModalComponent = ({
  userId,
  opened,
  loading,
  onClose,
  onSubmit,
}: AddMeasurementModalProps) => {
  const {
    onSubmit: onSubmitForm,
    getInputProps,
    reset,
  } = useForm({
    initialValues,
    validate: {
      weight: ({ value }) => {
        if (!value) return null
        return value > 29 && value < 301 ? null : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
      },
    },
  })

  const resetAndClose = () => {
    reset()
    onClose()
  }

  return (
    <ModalComponent opened={opened} onClose={resetAndClose} title="Add New Measurement">
      <form
        onSubmit={onSubmitForm((values) => {
          onSubmit(
            { _id: '', userId, ...values },
            {
              onSuccess: resetAndClose,
            },
          )
        })}
      >
        {Object.keys(inputValues).map((key: string, idx) => (
          <TextInput
            key={`modal-input-${inputValues[key].value}-${idx}`}
            mt="sm"
            mb="xl"
            label={inputValues[key].label}
            placeholder={inputValues[key].placeholder}
            rightSection={inputValues[key].rightSection}
            {...getInputProps(`${inputValues[key].value}.value`)}
          />
        ))}
        <ButtonComponent loading={loading} type="submit" variant="gradient">
          Submit
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}
