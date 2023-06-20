import { RangesTable } from '@/types/RangesTable'

export const rangesApi = {
  getRanges: async (userId: string): Promise<RangesTable> => {
    const res = await fetch(`http://localhost:3001/api/ranges/${userId}`)
    const data = await res.json()

    if (!data) throw new Error(data.error)
    return data
  },
}
