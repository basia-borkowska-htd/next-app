import { api } from '@/api'
import { ErrorComponent } from '@/components/error'
import { PageLoaderComponent } from '@/components/pageLoader'
import { TableComponent } from '@/components/table'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'
import { dates } from '@/utils/dates'
import { units } from '@/utils/units'
import React from 'react'
import { useQuery } from 'react-query'
import { HEADERS } from './helpers'

interface HistoryTabProps {
  userId: string
}
export const HistoryTabComponent = ({ userId }: HistoryTabProps) => {
  const {
    data: measurements,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.MEASUREMENTS],
    queryFn: () => api.measurement.getMeasurements(userId),
  })

  if (isLoading) return <PageLoaderComponent />
  if (error || !measurements) return <ErrorComponent />

  return (
    <TableComponent headers={HEADERS}>
      {measurements.map(
        ({
          createdAt,
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
          <tr>
            <th>{dates.fromUTC(createdAt)}</th>
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
          </tr>
        ),
      )}
    </TableComponent>
  )
}
