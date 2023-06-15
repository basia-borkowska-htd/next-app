import { SexEnum } from '@/enums/Sex.enum'
import { RangesTable } from '@/types/RangesTable'

export const api = {
  getRanges: async (userId: string, userSex: SexEnum): Promise<RangesTable | undefined> => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/ranges/${userId}?` +
          new URLSearchParams({
            sex: userSex,
          }),
      )
      const data = await res.json()
      return data
    } catch (error) {
      console.error(error)
      return undefined
    }
  },
}
