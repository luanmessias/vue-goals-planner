export const cropString = (string, length) => {
  if (string.length > length) {
    return string.substring(0, length) + '...'
  }
  return string
}
