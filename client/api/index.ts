import { authApi } from './auth'
import { measurementsApi } from './measurements'
import { rangesApi } from './ranges'
import { usersApi } from './users'

export const api = {
  auth: {
    ...authApi,
  },
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
