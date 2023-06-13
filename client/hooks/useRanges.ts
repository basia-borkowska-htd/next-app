import { SexEnum } from '@/enums/Sex.enum'
import { MeasurementType } from '@/types/Measurement'
import { RangesListType } from '@/types/RangesList'
import { useState } from 'react'

export const useRanges = () => {
  const [rangesList, setRangesList] = useState<RangesListType>()
  const [latestMeasurement, setLatestMeasurement] = useState<MeasurementType>()
  const [loading, setLoading] = useState(false)

  const getRanges = async (userId: string, userSex: SexEnum): Promise<boolean> => {
    try {
      setLoading(true)
      const res = await fetch(
        `http://localhost:3001/api/ranges/${userId}?` +
          new URLSearchParams({
            sex: userSex,
          }),
      )
      const data = await res.json()
      console.log({ data })
      setRangesList(data.rangesList)
      setLatestMeasurement(data.latestMeasurement)

      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    latestMeasurement,
    rangesList,
    getRanges,
  }
}
