

export function clientError(message = 'bad/data') {
  return createError({
    statusCode: 400,
    statusMessage: message
  })
}