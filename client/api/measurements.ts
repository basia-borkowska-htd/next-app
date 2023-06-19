import { MeasurementType } from '@/types/Measurement'

export const measurementsApi = {
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
}
