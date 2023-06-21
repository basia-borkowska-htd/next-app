import dayjs from 'dayjs'

export const dates = {
  fromUTC: (date: string) => {
    return dayjs(date).format('DD/MM/YYYY HH:MM')
  },
}
