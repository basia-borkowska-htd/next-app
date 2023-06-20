export const dates = {
  fromUTC: (date: string) => {
    var dateFormat = new Date(date)
    return dateFormat.toDateString() + ', ' + dateFormat.getHours() + ':' + dateFormat.getMinutes()
  },
}
