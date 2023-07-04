import { UserType } from '@/types/User'
import { RecordType } from '@/types/helpers'

import { SexEnum } from '@/enums/Sex.enum'
import { UnitEnum } from '@/enums/Unit.enum'

export const getInitialValues = (user: UserType | undefined) => ({
  name: user?.name || '',
  age: user?.age || 0,
  sex: user?.sex || SexEnum.WOMAN,
  height: user?.height || { value: undefined, unit: UnitEnum.CENTIMETERS },
  weight: user?.weight || { value: undefined, unit: UnitEnum.KILOS },
  avatarUrl: user?.avatarUrl || '',
})

export const validate = {
  name: ({ length }) => (length < 2 ? 'Name must be at least 2 characters' : undefined),
  age: (age: number) =>
    age > 17 && age < 100 ? undefined : 'Invalid age: acceptable values are from 18 to 99 years-old',
  sex: (sex: SexEnum) => (!sex ? 'Sex is required' : undefined),
  height: (height: RecordType) => {
    if (!height || !height?.value) return undefined
    return height?.value > 99 && height?.value < 301
      ? undefined
      : 'Invalid height: acceptable values are from 100 cm to 300 cm'
  },
  weight: (weight: RecordType) => {
    if (!weight || !weight?.value) return undefined
    return weight.value < 301 ? undefined : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
  },
}
