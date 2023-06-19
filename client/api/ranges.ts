import { SexEnum } from '@/enums/Sex.enum'
import { RangesTable } from '@/types/RangesTable'

export const rangesApi = {
  getRanges: async (userId: string, userSex: SexEnum): Promise<RangesTable> => {
    const res = await fetch(
      `http://localhost:3001/api/ranges/${userId}?` +
        new URLSearchParams({
          sex: userSex,
        }),
    )

    const data = await res.json()

    if (!data) throw new Error(data.error)
    return data
  },
}
