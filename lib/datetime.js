function convertDateTime(dateTime) {
  const [dateStr, timeStr] = dateTime.split(" ")
  const date = dateStr.split("-")
  const yyyy = date[0]
  const mm = date[1] - 1
  const dd = date[2]

  const time = timeStr.split(":")
  const h = time[0]
  const m = time[1]
  const s = parseInt(time[2], 10) // get rid of that 00.0;

  return new Date(yyyy, mm, dd, h, m, s)
}

export const getDateTimeString = (datetime) => {
  const d = convertDateTime(datetime)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

export const getDateString = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}
