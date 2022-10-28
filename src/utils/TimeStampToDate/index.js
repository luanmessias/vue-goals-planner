export const timeStampToDate = (timestamp) => {
  return new Date(timestamp * 1000)
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
