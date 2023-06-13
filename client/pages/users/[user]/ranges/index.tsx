import { SexEnum } from '@/enums/Sex.enum'
import { useRanges } from '@/hooks/useRanges'
import { useEffect } from 'react'

interface RangesProps {
  userId: string
  userSex: SexEnum
}

export const RangesComponent = ({ userId, userSex }: RangesProps) => {
  const { loading, latestMeasurement, rangesList, getRanges } = useRanges()

  useEffect(() => {
    getRanges(userId, userSex)
  }, [userId, userSex])
  console.log({ loading, latestMeasurement, rangesList })
  return (
    <div>
      <div>{JSON.stringify(rangesList)}</div>| Edit | Add
    </div>
  )
}
