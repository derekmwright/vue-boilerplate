export const validateEmail = (email: string): Array<string> => {
  let errors = Array<string>()

  if (
    !email.length ||
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  ) {
    errors.push("Enter a valid email address")
  }

  return errors
}
