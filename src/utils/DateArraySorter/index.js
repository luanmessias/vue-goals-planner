import { timeStampToDate } from '@/utils/TimeStampToDate'

export const sortArrayByDate = (arr, Desc) => {
  return arr.sort((a, b) => {
    const dateA = timeStampToDate(a.created_at)
    const dateB = timeStampToDate(b.created_at)
    return Desc ? dateB - dateA : dateA - dateB
  })
}
