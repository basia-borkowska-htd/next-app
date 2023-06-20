export const units = {
  display: (unit: string, value?: number | null) => {
    if (!value) return '-'
    return `${value} ${unit}`
  },
  // TODO add conversion to imperial and to metric
}
