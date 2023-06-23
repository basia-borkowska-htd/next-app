import dayjs from 'dayjs'

export const dates = {
  format: (iso: string, format: string = 'MMM DD YYYY, HH:mm') => {
    return dayjs(iso).format(format)
  },
  fromISOToDate: (iso: string) => {
    return new Date(iso)
  },
  fromDateToISO: (date: Date | null) => {
    return dayjs(date).toISOString()
  },
}
