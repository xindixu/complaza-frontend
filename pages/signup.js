import React from "react"
import NewSession, { SIGNUP } from "../components/forms/session"
import { signUp } from "../lib/auth"

function SignUp(props) {
  return <NewSession type={SIGNUP} onSubmit={signUp} />
}

export default SignUp
