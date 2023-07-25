import { RangesTable } from '@/types/RangesTable'

import { apiUrl } from './global'

export const rangesApi = {
  getRanges: async (userId: string): Promise<RangesTable> => {
    const res = await fetch(`${apiUrl}/ranges/${userId}`)
    const data = await res.json()

    if (!data) throw new Error(data.error)
    return data
  },
}
