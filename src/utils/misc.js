const formatDate = date =>
  new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'short'}).format(
    date,
  )

export {formatDate}
