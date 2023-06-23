import dayjs from 'dayjs'

export const DEFAULT_DATE_FORMAT = 'DD MMM YYYY, HH:mm'

export const dates = {
  format: (iso: string, format: string = DEFAULT_DATE_FORMAT) => {
    return dayjs(iso).format(format)
  },
  fromISOToDate: (iso: string) => {
    return new Date(iso)
  },
  fromDateToISO: (date: Date | null) => {
    return dayjs(date).toISOString()
  },
}
