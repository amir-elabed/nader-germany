export const formatDate = dateToFormat => {
  const date = new Date(dateToFormat)

  // Use the Date methods to get day, month, and year
  const day = date.getDate()
  const month = date.getMonth() + 1 // Note: Months are zero-based, so we add 1
  const year = date.getFullYear()

  // Create a formatted date string
  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}

export const monthsDifference = (pubDate, endOfPub) => {
  const publicationDate = new Date(pubDate)
  const endOfPublication = new Date(endOfPub)

  const monthsDifference =
    endOfPublication.getUTCMonth() -
    publicationDate.getUTCMonth() +
    12 * (endOfPublication.getUTCFullYear() - publicationDate.getUTCFullYear())

  return monthsDifference
}
