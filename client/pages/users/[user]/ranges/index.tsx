import { api } from '@/api'
import { useTranslate } from '@/hooks/useTranslate'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { queryClient } from '@/pages/_app'

import { ButtonComponent } from '@/components/button'
import { ContainerComponent } from '@/components/container'
import { EmptyStateComponent } from '@/components/emptyState'
import { ErrorComponent } from '@/components/error'
import { MeasurementModalComponent } from '@/components/modals/measurementModal'
import { PageLoaderComponent } from '@/components/pageLoader'
import { TableComponent } from '@/components/table'

import { MeasurementType } from '@/types/Measurement'

import { DashboardTabEnum } from '@/enums/DashboardTab.enum'
import { MeasurementEnum, MeasurementLabels } from '@/enums/Measurement.enum'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'
import { units } from '@/utils/units'

interface RangesProps {
  userId: string
}

export const RangesComponent = ({ userId }: RangesProps) => {
  const { t } = useTranslate()
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: [QueryKeyEnum.RANGES, userId],
    queryFn: () => api.range.getRanges(userId),
  })
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const redirectToMeasurementHistory = () => {
    router.push(Pathnames.dashboard.replace(':id', userId).replace(':activeTab', DashboardTabEnum.HISTORY))
  }

  const addMeasurementMutation = useMutation({
    mutationFn: (measurement: MeasurementType) => api.measurement.addMeasurement(measurement),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true })
      notify({ type: 'success', message: t('add_measurement.toast_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('add_measurement.toast_error') })
    },
  })

  if (error) return <ErrorComponent title={error.toString()} compact />
  if (isLoading || isFetching) return <PageLoaderComponent compact />
  if (!data) return <EmptyStateComponent title={t('user.ranges.empty_state')} compact />

  const { latestMeasurement: measurement, rangesList: ranges } = data

  return (
    <ContainerComponent>
      <div className="flex justify-between my-5 items-center">
        <div className="font-bold text-xl">{t('user.ranges.title')}</div>
        <div className="flex gap-2">
          <ButtonComponent variant="outline" onClick={redirectToMeasurementHistory}>
            {t('user.ranges.history_button')}
          </ButtonComponent>
          <ButtonComponent variant="outline" onClick={open}>
            {t('add_measurement.button')}
          </ButtonComponent>
        </div>
      </div>

      <TableComponent
        headers={['', t('user.ranges.headers.min'), t('user.ranges.headers.max'), t('user.ranges.headers.current')]}
      >
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.WEIGHT]}</td>
          <td>{units.display(ranges.weight.unit, ranges.weight.min)}</td>
          <td>{units.display(ranges.weight.unit, ranges.weight.max)}</td>
          <td>{units.display(ranges.weight.unit, measurement?.weight?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.BODY_FAT]}</td>
          <td>{units.display(ranges.bodyFat.unit, ranges.bodyFat.min)}</td>
          <td>{units.display(ranges.bodyFat.unit, ranges.bodyFat.max)}</td>
          <td>{units.display(ranges.bodyFat.unit, measurement?.bodyFat?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.VISCERAL_FAT]}</td>
          <td>{units.display(ranges.visceralFat.unit, ranges.visceralFat.min)}</td>
          <td>{units.display(ranges.visceralFat.unit, ranges.visceralFat.max)}</td>
          <td>{units.display(ranges.visceralFat.unit, measurement?.visceralFat?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.MUSCLES]}</td>
          <td>{units.display(ranges.muscles.unit, ranges.muscles.min)}</td>
          <td>{units.display(ranges.muscles.unit, ranges.muscles.max)}</td>
          <td>{units.display(ranges.muscles.unit, measurement?.muscles?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.PROTEIN]}</td>
          <td>{units.display(ranges.protein.unit, ranges.protein.min)}</td>
          <td>{units.display(ranges.protein.unit, ranges.protein.max)}</td>
          <td>{units.display(ranges.protein.unit, measurement?.protein?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.WATER]}</td>
          <td>{units.display(ranges.water.unit, ranges.water.min)}</td>
          <td>{units.display(ranges.water.unit, ranges.water.max)}</td>
          <td>{units.display(ranges.water.unit, measurement?.water?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.BONE_TISSUE]}</td>
          <td>{units.display(ranges.boneTissue.unit, ranges.boneTissue.min)}</td>
          <td>{units.display(ranges.boneTissue.unit, ranges.boneTissue.max)}</td>
          <td>{units.display(ranges.boneTissue.unit, measurement?.boneTissue?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.BMI]}</td>
          <td>{units.display(ranges.BMI.unit, ranges.BMI.min)}</td>
          <td>{units.display(ranges.BMI.unit, ranges.BMI.max)}</td>
          <td>{units.display(ranges.BMI.unit, measurement?.BMI?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.BMR]}</td>
          <td>{units.display(ranges.BMR.unit, ranges.BMR.min)}</td>
          <td>{units.display(ranges.BMR.unit, ranges.BMR.max)}</td>
          <td>{units.display(ranges.BMR.unit, measurement?.BMR?.value)}</td>
        </tr>
        <tr>
          <td>{MeasurementLabels[MeasurementEnum.METABOLIC_AGE]}</td>
          <td>{units.display(ranges.metabolicAge.unit, ranges.metabolicAge.min)}</td>
          <td>{units.display(ranges.metabolicAge.unit, ranges.metabolicAge.max)}</td>
          <td>{units.display(ranges.metabolicAge.unit, measurement?.metabolicAge?.value)}</td>
        </tr>
      </TableComponent>

      <MeasurementModalComponent
        opened={opened}
        userId={userId}
        onClose={close}
        onSubmit={addMeasurementMutation.mutate}
        loading={addMeasurementMutation.isLoading}
      />
    </ContainerComponent>
  )
}
