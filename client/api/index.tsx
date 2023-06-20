import { measurementsApi } from './measurements'
import { rangesApi } from './ranges'
import { usersApi } from './users'

export const api = {
  range: {
    ...rangesApi,
  },
  user: {
    ...usersApi,
  },
  measurement: {
    ...measurementsApi,
  },
}
