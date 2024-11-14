export function errorMessage(message: string) {
  return { errorMessage: message };
}

export function errorMessageWithField(message: string, field: string) {
  return { errorMessage: message, field: field };
}
