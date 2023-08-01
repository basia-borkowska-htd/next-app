import { ChartDataType } from '@/types/ChartData'
import { MeasurementType } from '@/types/Measurement'

import { MeasurementEnum } from '@/enums/Measurement.enum'
import { TimePeriodEnum } from '@/enums/TimePeriod.enum'

import { apiUrl } from './global'

export const measurementsApi = {
  getMeasurements: async (userId: string): Promise<MeasurementType[]> => {
    const res = await fetch(
      `${apiUrl}/measurements?${new URLSearchParams({
        userId,
      })}`,
    )
    const data = await res.json()
    if (!data?.measurements) throw new Error(data.error)
    return data.measurements
  },
  addMeasurement: async (measurement: MeasurementType): Promise<MeasurementType> => {
    const newMeasurement = { ...measurement, _id: undefined }
    const res = await fetch(`${apiUrl}/measurements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMeasurement),
    })
    const data = await res.json()

    if (!data) throw new Error(data.error)

    return data.measurement
  },
  deleteMeasurement: async (id: string): Promise<boolean> => {
    if (!id) throw new Error('Measurement does not exist')
    const res = await fetch(`${apiUrl}/measurements/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    if (!data?.success) throw new Error(data.error)
    return data.success
  },
  updateMeasurement: async (measurement: MeasurementType): Promise<MeasurementType> => {
    const res = await fetch(`${apiUrl}/measurements/${measurement._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(measurement),
    })
    const data = await res.json()

    if (!data?.measurement) throw new Error(data.error)
    return data.measurement
  },
  getChartMeasurements: async (
    userId: string,
    key: MeasurementEnum,
    period: TimePeriodEnum,
  ): Promise<ChartDataType[]> => {
    const res = await fetch(
      `${apiUrl}/measurements/${userId}/charts?${new URLSearchParams({
        key,
        period,
      })}`,
    )

    const data = await res.json()
    if (!data?.chart) throw new Error(data.error)
    return data.chart
  },
}
