import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { ModalComponent } from '@/components/modal'
import { ButtonComponent } from '@/components/button'
import { MeasurementType } from '@/types/Measurement'

import { initialValues, inputValues } from './helpers'
import { MutateOptions } from '@tanstack/react-query'
import { DateTimePicker } from '@mantine/dates'
import { dates } from '@/utils/dates'

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
    setFieldValue,
    reset,
  } = useForm({
    initialValues,
    validate: {
      weight: ({ value }) => {
        if (!value) return undefined
        return value > 29 && value < 301 ? undefined : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
      },
    },
  })

  const resetAndClose = () => {
    reset()
    onClose()
  }

  return (
    <ModalComponent opened={opened} onClose={resetAndClose} title="Add New Measurement" size="xl">
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
        <div className="grid grid-cols-2 grid-flow-row gap-4">
          {inputValues.map(({ value, label, placeholder, rightSection }, idx) => (
            <TextInput
              key={`modal-input-${value}-${idx}`}
              label={label}
              placeholder={placeholder}
              rightSection={rightSection}
              {...getInputProps(`${value}.value`)}
            />
          ))}
          <DateTimePicker
            valueFormat="DD MMM YYYY, HH:mm"
            label="Date and time"
            placeholder="09 Jun 2023, 16:30"
            value={dates.fromISOToDate(getInputProps('date').value)}
            onChange={(date) => setFieldValue('date', dates.fromDateToISO(date))}
          />
        </div>
        <ButtonComponent className="mt-6" loading={loading} type="submit" variant="gradient">
          Submit
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}
