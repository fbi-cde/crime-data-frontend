export const getTimestampString = () => {
  const date = new Date()
  const dateStr =
    `${date.getMonth() + 1}_${date.getDate()}_${date.getFullYear()}`
  return dateStr
}
export { getTimestampString as default }
