import { SexEnum } from '@/enums/Sex.enum'
import { MeasurementType } from '@/types/Measurement'
import { RangesTable } from '@/types/RangesTable'

export const measurementsApi = {
  addMeasurement: async (measurement: MeasurementType): Promise<MeasurementType | undefined> => {
    const newMeasurement = { ...measurement, _id: undefined }

    try {
      const res = await fetch('http://localhost:3001/api/measurements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeasurement),
      })
      const data = await res.json()

      return data.measurement
    } catch (error) {
      console.error(error)
      return undefined
    }
  },
}
