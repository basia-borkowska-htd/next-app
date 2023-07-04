import { api } from '@/api'
import { ActionIcon, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import get from 'lodash/get'
import React, { useState } from 'react'

import { queryClient } from '@/pages/_app'

import { EmptyStateComponent } from '@/components/emptyState'
import { ErrorComponent } from '@/components/error'
import { ConfirmationModalComponent } from '@/components/modals/confirmationModal'
import { MeasurementModalComponent } from '@/components/modals/measurementModal'
import { PageLoaderComponent } from '@/components/pageLoader'
import { TableComponent } from '@/components/table'

import { MeasurementType } from '@/types/Measurement'

import { MeasurementLabels } from '@/enums/Measurement.enum'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { dates } from '@/utils/dates'
import { notify } from '@/utils/notifications'
import { units } from '@/utils/units'

interface HistoryTabProps {
  userId: string
}
export const HistoryTabComponent = ({ userId }: HistoryTabProps) => {
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false)
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false)
  const [currentMeasurement, setCurrentMeasurement] = useState<MeasurementType | undefined>(undefined)
  const {
    data: measurements,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.MEASUREMENTS],
    queryFn: () => api.measurement.getMeasurements(userId),
  })

  const deleteMeasurementMutation = useMutation({
    mutationFn: () => api.measurement.deleteMeasurement(currentMeasurement?._id || ''),
    onSuccess: async () => {
      closeDeleteModal()
      queryClient.setQueryData(
        [QueryKeyEnum.MEASUREMENTS],
        measurements?.filter((measurement) => measurement._id !== currentMeasurement?._id),
      )
      setCurrentMeasurement(undefined)
      notify({ type: 'success', message: 'Measurement deleted successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to delete measurement' })
    },
  })

  const editMeasurementMutation = useMutation({
    mutationFn: (measurement: MeasurementType) => api.measurement.updateMeasurement(measurement),
    onSuccess: async (editedMeasurement) => {
      queryClient.setQueryData(
        [QueryKeyEnum.MEASUREMENTS],
        measurements?.map((measurement) =>
          measurement._id === editedMeasurement?._id ? editedMeasurement : measurement,
        ),
      )
      setCurrentMeasurement(undefined)
      notify({ type: 'success', message: 'Measurement edited successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to edit measurement' })
    },
  })

  if (isLoading) return <PageLoaderComponent compact />
  if (error) return <ErrorComponent />
  if (!measurements?.length) return <EmptyStateComponent title="No measurements" compact />

  const handleActionClick = (value: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: 'edit' | 'delete') => {
    const measurementId = get(value, 'target.parentElement.id', '')
    setCurrentMeasurement(measurements.find(({ _id }) => _id === measurementId))
    if (action === 'delete') openDeleteModal()
    if (action === 'edit') openEditModal()
  }

  return (
    <>
      <TableComponent headers={['Date', ...Object.values(MeasurementLabels)]}>
        {measurements.map(
          ({
            _id,
            date,
            weight,
            bodyFat,
            visceralFat,
            muscles,
            protein,
            water,
            boneTissue,
            BMI,
            BMR,
            metabolicAge,
            bodyRating,
          }) => (
            <tr key={`table-row-${_id}`}>
              <th>{dates.format(date)}</th>
              <th>{units.display(weight.unit, weight.value)}</th>
              <th>{units.display(bodyFat.unit, bodyFat.value)}</th>
              <th>{units.display(visceralFat.unit, visceralFat.value)}</th>
              <th>{units.display(muscles.unit, muscles.value)}</th>
              <th>{units.display(protein.unit, protein.value)}</th>
              <th>{units.display(water.unit, water.value)}</th>
              <th>{units.display(boneTissue.unit, boneTissue.value)}</th>
              <th>{units.display(BMI.unit, BMI.value)}</th>
              <th>{units.display(BMR.unit, BMR.value)}</th>
              <th>{units.display(metabolicAge.unit, metabolicAge.value)}</th>
              <th>{units.display(bodyRating.unit, bodyRating.value)}</th>
              <td key={`table-cell-row-${_id}`}>
                <Group spacing={0} position="right">
                  <ActionIcon id={_id} onClick={(value) => handleActionClick(value, 'edit')}>
                    <IconPencil size="1rem" stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon color="red" id={_id} onClick={(value) => handleActionClick(value, 'delete')}>
                    <IconTrash size="1rem" stroke={1.5} />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ),
        )}
      </TableComponent>
      <ConfirmationModalComponent
        opened={openedDeleteModal}
        onClose={closeDeleteModal}
        loading={false}
        onSubmit={deleteMeasurementMutation.mutate}
        description="Are you sure you want to delete this measurement?"
      />
      <MeasurementModalComponent
        opened={openedEditModal}
        onClose={closeEditModal}
        userId={userId}
        loading={editMeasurementMutation.isLoading}
        onSubmit={editMeasurementMutation.mutate}
        measurement={currentMeasurement}
      />
    </>
  )
}
