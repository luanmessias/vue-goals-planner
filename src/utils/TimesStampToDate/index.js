export const timeStampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return new Date(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}

export const secondsAndNanosecondsToDate = (seconds, nanoseconds) => {
  const timestamp = seconds + nanoseconds / 1000000000
  return timeStampToDate(timestamp)
}

export const dateToSecondsAndNanoseconds = (date) => {
  const seconds = Math.floor(date.getTime() / 1000)
  const nanoseconds = (date.getTime() % 1000) * 1000000
  return { seconds, nanoseconds }
}
