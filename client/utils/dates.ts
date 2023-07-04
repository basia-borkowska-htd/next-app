import dayjs from 'dayjs'

export const DEFAULT_DATE_FORMAT = 'DD MMM YYYY, HH:mm'

export const dates = {
  format: (iso: string, format: string = DEFAULT_DATE_FORMAT) => dayjs(iso).format(format),
  fromISOToDate: (iso: string) => new Date(iso),
  fromDateToISO: (date: Date | null) => dayjs(date).toISOString(),
}
