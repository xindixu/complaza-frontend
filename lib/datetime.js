export const getDateTimeString = (datetime) => {
  const d = new Date(datetime)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}

export const getDateString = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString()
}
