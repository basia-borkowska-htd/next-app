import { PageLoaderComponent } from '@/components/pageLoader'
import { ButtonComponent } from '@/components/button'
import { Pathnames } from '@/utils/pathnames'
import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ErrorComponent } from '@/components/error'
import { AddMeasurementModalComponent } from '@/components/addMeasurementModal'
import { useDisclosure } from '@mantine/hooks'
import { MeasurementType } from '@/types/Measurement'
import { notify } from '@/utils/notifications'
import { api } from '@/api'
import { units } from '@/utils/units'
import { DashboardTabEnum } from '@/enums/DashboardTab.enum'
import { TableComponent } from '@/components/table'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'

interface RangesProps {
  userId: string

  refetchUser: () => Promise<void>
}

export const RangesComponent = ({ userId, refetchUser }: RangesProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeyEnum.RANGES],
    queryFn: () => api.range.getRanges(userId),
  })
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)
  const queryClient = useQueryClient()

  const redirectToMeasurementHistory = () => {
    router.push(Pathnames.dashboard.replace(':id', userId).replace(':activeTab', DashboardTabEnum.HISTORY))
  }

  const addMeasurementMutation = useMutation({
    mutationFn: (measurement: MeasurementType) => api.measurement.addMeasurement(measurement),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeyEnum.RANGES] })
      await refetchUser()
      notify({ type: 'success', message: 'Measurement added successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to add measurement' })
    },
  })

  if (error) return <ErrorComponent title={error.toString()} />
  if (isLoading) return <PageLoaderComponent />
  if (!data) return <div>no data</div> // TODO create component

  const { latestMeasurement: measurement, rangesList: ranges } = data

  return (
    <Container>
      <div className="flex justify-between my-5 items-center">
        <h2>Ranges</h2>
        <div className="flex gap-2">
          <ButtonComponent variant="outline" onClick={redirectToMeasurementHistory}>
            See measurement history
          </ButtonComponent>
          <ButtonComponent variant="outline" onClick={open}>
            Add new measurement
          </ButtonComponent>
        </div>
      </div>

      <TableComponent headers={['', 'Min', 'Max', 'Current']}>
        <tr>
          <td>Weight</td>
          <td>{units.display(ranges.weight.unit, ranges.weight.min)}</td>
          <td>{units.display(ranges.weight.unit, ranges.weight.max)}</td>
          <td>{units.display(ranges.weight.unit, measurement?.weight?.value)}</td>
        </tr>
        <tr>
          <td>Body Fat</td>
          <td>{units.display(ranges.bodyFat.unit, ranges.bodyFat.min)}</td>
          <td>{units.display(ranges.bodyFat.unit, ranges.bodyFat.max)}</td>
          <td>{units.display(ranges.bodyFat.unit, measurement?.bodyFat?.value)}</td>
        </tr>
        <tr>
          <td>Visceral Fat</td>
          <td>{units.display(ranges.visceralFat.unit, ranges.visceralFat.min)}</td>
          <td>{units.display(ranges.visceralFat.unit, ranges.visceralFat.max)}</td>
          <td>{units.display(ranges.visceralFat.unit, measurement?.visceralFat?.value)}</td>
        </tr>
        <tr>
          <td>Muscles</td>
          <td>{units.display(ranges.muscles.unit, ranges.muscles.min)}</td>
          <td>{units.display(ranges.muscles.unit, ranges.muscles.max)}</td>
          <td>{units.display(ranges.muscles.unit, measurement?.muscles?.value)}</td>
        </tr>
        <tr>
          <td>Protein</td>
          <td>{units.display(ranges.protein.unit, ranges.protein.min)}</td>
          <td>{units.display(ranges.protein.unit, ranges.protein.max)}</td>
          <td>{units.display(ranges.protein.unit, measurement?.protein?.value)}</td>
        </tr>
        <tr>
          <td>Water</td>
          <td>{units.display(ranges.water.unit, ranges.water.min)}</td>
          <td>{units.display(ranges.water.unit, ranges.water.max)}</td>
          <td>{units.display(ranges.water.unit, measurement?.water?.value)}</td>
        </tr>
        <tr>
          <td>Bone Tissue</td>
          <td>{units.display(ranges.boneTissue.unit, ranges.boneTissue.min)}</td>
          <td>{units.display(ranges.boneTissue.unit, ranges.boneTissue.max)}</td>
          <td>{units.display(ranges.boneTissue.unit, measurement?.boneTissue?.value)}</td>
        </tr>
        <tr>
          <td>BMI</td>
          <td>{units.display(ranges.BMI.unit, ranges.BMI.min)}</td>
          <td>{units.display(ranges.BMI.unit, ranges.BMI.max)}</td>
          <td>{units.display(ranges.BMI.unit, measurement?.BMI?.value)}</td>
        </tr>
        <tr>
          <td>BMR</td>
          <td>{units.display(ranges.BMR.unit, ranges.BMR.min)}</td>
          <td>{units.display(ranges.BMR.unit, ranges.BMR.max)}</td>
          <td>{units.display(ranges.BMR.unit, measurement?.BMR?.value)}</td>
        </tr>
        <tr>
          <td>Metabolic Age</td>
          <td>{units.display(ranges.metabolicAge.unit, ranges.metabolicAge.min)}</td>
          <td>{units.display(ranges.metabolicAge.unit, ranges.metabolicAge.max)}</td>
          <td>{units.display(ranges.metabolicAge.unit, measurement?.metabolicAge?.value)}</td>
        </tr>
      </TableComponent>

      <AddMeasurementModalComponent
        opened={opened}
        userId={userId}
        onClose={close}
        onSubmit={addMeasurementMutation.mutate}
        loading={addMeasurementMutation.isLoading}
      />
    </Container>
  )
}
