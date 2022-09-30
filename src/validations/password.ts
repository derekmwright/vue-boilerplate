export const validateNewPassword = (password: string): Array<string> => {
  let errors = Array<string>()

  if (password.length < 8) {
    errors.push("Password must be a minimum of 8 characters long")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/[\s\^\$\*\.\[\]\{\}\(\)\?\-\"\!\@\#\%\&\/\\\,\>\<\'\:\;\|\_\~\`\+\=]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  if (/^\s/.test(password) || /.+\s$/.test(password)) {
    errors.push("Password cannot start or end with a space")
  }

  return errors
}

export const validatePassword = (password: string): Array<string> => {
  let errors = Array<string>()

  if (!password.length) {
    errors.push("Password cannot be empty")
  }

  return errors
}
