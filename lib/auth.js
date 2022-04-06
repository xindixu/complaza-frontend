import { Auth } from "aws-amplify"

export function signUp({ email, password }) {
  return Auth.signUp({
    username: email,
    password,
    attributes: {
      email,
    },
  })
}

export function comfirmSignUp({ email, code }) {
  return Auth.confirmSignUp(email, code)
}

export function signIn({ email, password }) {
  return Auth.signIn(email, password)
}
