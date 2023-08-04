import { api } from '@/api'
import { ActionIcon, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconNote, IconPencil, IconTrash } from '@tabler/icons-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import get from 'lodash/get'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import { queryClient } from '@/pages/_app'

import { NotesModalComponent } from '@/components/common/modals/NotesModal'

import { useTranslate } from '@/hooks/useTranslate'

import { MeasurementType } from '@/types/Measurement'

import { MeasurementEnum, getMeasurementLabel } from '@/enums/Measurement.enum'
import { MeasurementsNoteEnum } from '@/enums/MeasurementNote.enum'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { dates } from '@/utils/dates'
import { notify } from '@/utils/notifications'
import { units } from '@/utils/units'

const ErrorComponent = dynamic(() => import('@/components/common/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/common/pageLoader').then((component) => component.PageLoaderComponent),
)
const MeasurementModalComponent = dynamic(() =>
  import('@/components/common/modals/measurementModal').then((component) => component.MeasurementModalComponent),
)
const ConfirmationModalComponent = dynamic(() =>
  import('@/components/common/modals/confirmationModal').then((component) => component.ConfirmationModalComponent),
)
const EmptyStateComponent = dynamic(() =>
  import('@/components/common/emptyState').then((component) => component.EmptyStateComponent),
)
const TableComponent = dynamic(() => import('@/components/common/table').then((component) => component.TableComponent))

interface HistoryTabProps {
  userId: string
}
export const HistoryTabComponent = ({ userId }: HistoryTabProps) => {
  const { t } = useTranslate()
  const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false)
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false)
  const [openedNotesModal, { open: openNotesModal, close: closeNotesModal }] = useDisclosure(false)
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
      notify({ type: 'success', message: t('dashboard.delete_measurement.toast_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('dashboard.delete_measurement.toast_error') })
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
      notify({ type: 'success', message: t('dashboard.edit_measurement.toast_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('dashboard.edit_measurement.toast_error') })
    },
  })

  if (isLoading) return <PageLoaderComponent compact />
  if (error) return <ErrorComponent />
  if (!measurements?.length) return <EmptyStateComponent compact />

  const handleActionClick = (id: string, action: 'edit' | 'delete' | 'notes') => {
    setCurrentMeasurement(measurements.find(({ _id }) => _id === id))
    if (action === 'delete') openDeleteModal()
    if (action === 'edit') openEditModal()
    if (action === 'notes') openNotesModal()
  }

  const headers = Object.values(MeasurementEnum).map((key) => getMeasurementLabel(key, t))

  return (
    <>
      <TableComponent headers={[t('dashboard.date_header'), ...headers]}>
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
                  <ActionIcon id={_id} onClick={() => handleActionClick(_id, 'notes')}>
                    <IconNote size="1rem" stroke={1.5} />
                  </ActionIcon>{' '}
                  <ActionIcon id={_id} onClick={() => handleActionClick(_id, 'edit')}>
                    <IconPencil size="1rem" stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon color="red" id={_id} onClick={() => handleActionClick(_id, 'delete')}>
                    <IconTrash size="1rem" stroke={1.5} />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ),
        )}
      </TableComponent>

      <NotesModalComponent
        notes={currentMeasurement?.notes}
        opened={openedNotesModal}
        onClose={closeNotesModal}
        loading={editMeasurementMutation.isLoading}
        onSubmit={(notes) => editMeasurementMutation.mutate({ ...currentMeasurement, notes })}
      />

      <ConfirmationModalComponent
        opened={openedDeleteModal}
        onClose={closeDeleteModal}
        loading={deleteMeasurementMutation.isLoading}
        onSubmit={deleteMeasurementMutation.mutate}
        description={t('dashboard.delete_measurement_description')}
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
