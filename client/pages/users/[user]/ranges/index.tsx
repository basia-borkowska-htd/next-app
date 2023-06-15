import { PageLoaderComponent } from '@/components/pageLoader'
import { ButtonComponent } from '@/components/button'
import { SexEnum } from '@/enums/Sex.enum'
import { useRanges } from '@/hooks/useRanges'
import { Pathnames } from '@/utils/pathnames'
import { Container, Table } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface RangesProps {
  userId: string
  userSex: SexEnum
}

export const RangesComponent = ({ userId, userSex }: RangesProps) => {
  const { loading, latestMeasurement, ranges, getRanges } = useRanges()
  const router = useRouter()

  useEffect(() => {
    getRanges(userId, userSex)
  }, [userId, userSex])

  const redirectToMeasurementHistory = () => {
    router.push(Pathnames.dashboard.replace(':id', userId))
  }

  if (loading || !ranges) return <PageLoaderComponent />

  return (
    <Container>
      <div className="flex justify-between my-5 items-center">
        <h2>Ranges</h2>
        <div className="flex gap-2">
          <ButtonComponent variant="outline" onClick={redirectToMeasurementHistory}>
            See measurement history
          </ButtonComponent>
          <ButtonComponent variant="outline" onClick={() => alert('TODO not yet implemented')}>
            Add new measurement
          </ButtonComponent>
        </div>
      </div>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th></th>
            <th>Min</th>
            <th>Max</th>
            <th>Current</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Weight</td>
            <td>{convert(ranges.weight.unit, ranges.weight.min)}</td>
            <td>{convert(ranges.weight.unit, ranges.weight.max)}</td>
            <td>{convert(ranges.weight.unit, latestMeasurement?.weight?.value)}</td>
          </tr>
          <tr>
            <td>Body Fat</td>
            <td>{convert(ranges.bodyFat.unit, ranges.bodyFat.min)}</td>
            <td>{convert(ranges.bodyFat.unit, ranges.bodyFat.max)}</td>
            <td>{convert(ranges.bodyFat.unit, latestMeasurement?.bodyFat?.value)}</td>
          </tr>
          <tr>
            <td>Visceral Fat</td>
            <td>{convert(ranges.visceralFat.unit, ranges.visceralFat.min)}</td>
            <td>{convert(ranges.visceralFat.unit, ranges.visceralFat.max)}</td>
            <td>{convert(ranges.visceralFat.unit, latestMeasurement?.visceralFat?.value)}</td>
          </tr>
          <tr>
            <td>Muscles</td>
            <td>{convert(ranges.muscles.unit, ranges.muscles.min)}</td>
            <td>{convert(ranges.muscles.unit, ranges.muscles.max)}</td>
            <td>{convert(ranges.muscles.unit, latestMeasurement?.muscles?.value)}</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>{convert(ranges.protein.unit, ranges.protein.min)}</td>
            <td>{convert(ranges.protein.unit, ranges.protein.max)}</td>
            <td>{convert(ranges.protein.unit, latestMeasurement?.protein?.value)}</td>
          </tr>
          <tr>
            <td>Water</td>
            <td>{convert(ranges.water.unit, ranges.water.min)}</td>
            <td>{convert(ranges.water.unit, ranges.water.max)}</td>
            <td>{convert(ranges.water.unit, latestMeasurement?.water?.value)}</td>
          </tr>
          <tr>
            <td>Bone Tissue</td>
            <td>{convert(ranges.boneTissue.unit, ranges.boneTissue.min)}</td>
            <td>{convert(ranges.boneTissue.unit, ranges.boneTissue.max)}</td>
            <td>{convert(ranges.boneTissue.unit, latestMeasurement?.boneTissue?.value)}</td>
          </tr>
          <tr>
            <td>BMI</td>
            <td>{convert(ranges.BMI.unit, ranges.BMI.min)}</td>
            <td>{convert(ranges.BMI.unit, ranges.BMI.max)}</td>
            <td>{convert(ranges.BMI.unit, latestMeasurement?.BMI?.value)}</td>
          </tr>
          <tr>
            <td>BMR</td>
            <td>{convert(ranges.BMR.unit, ranges.BMR.min)}</td>
            <td>{convert(ranges.BMR.unit, ranges.BMR.max)}</td>
            <td>{convert(ranges.BMR.unit, latestMeasurement?.BMR?.value)}</td>
          </tr>
          <tr>
            <td>Metabolic Age</td>
            <td>{convert(ranges.metabolicAge.unit, ranges.metabolicAge.min)}</td>
            <td>{convert(ranges.metabolicAge.unit, ranges.metabolicAge.max)}</td>
            <td>{convert(ranges.metabolicAge.unit, latestMeasurement?.metabolicAge?.value)}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

const convert = (unit: string, value?: number) => {
  if (!value) return '-'
  return `${value} ${unit}`
}
