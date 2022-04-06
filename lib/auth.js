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

export function confirmSignUp({ email, code }) {
  return Auth.confirmSignUp(email, code)
}

export function signIn({ email, password }) {
  return Auth.signIn(email, password)
}

export async function getCurrentUser() {
  try {
    const { attributes, ...rest } = await Auth.currentAuthenticatedUser()
    console.log(rest)
    return attributes
  } catch (error) {
    return {}
  }
}
