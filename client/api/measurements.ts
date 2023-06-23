import { ChartDataType } from '@/types/ChartData'
import { MeasurementType } from '@/types/Measurement'

export const measurementsApi = {
  getMeasurements: async (userId: string): Promise<MeasurementType[]> => {
    const res = await fetch(
      `http://localhost:3001/api/measurements?` +
        new URLSearchParams({
          userId,
        }),
    )
    const data = await res.json()
    if (!data?.measurements) throw new Error(data.error)
    return data.measurements
  },
  addMeasurement: async (measurement: MeasurementType): Promise<MeasurementType> => {
    const newMeasurement = { ...measurement, _id: undefined }
    const res = await fetch('http://localhost:3001/api/measurements', {
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
    const res = await fetch(`http://localhost:3001/api/measurements/${id}`, {
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
    if (!measurement) throw new Error('User does not exist')
    const res = await fetch(`http://localhost:3001/api/measurements/${measurement._id}`, {
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
  getChartMeasurements: async (userId: string, key: string): Promise<ChartDataType[]> => {
    const res = await fetch(
      `http://localhost:3001/api/measurements/${userId}/charts?` +
        new URLSearchParams({
          key,
        }),
    )

    const data = await res.json()
    if (!data?.chart) throw new Error(data.error)
    return data.chart
  },
}
