import React from "react"
import { useRouter } from "next/router"
import Session from "../components/session"
import { SIGNUP } from "../components/session/form"

function SignUp() {
  const router = useRouter()

  const onSuccess = (user) => {
    router.push(`/confirm?email=${user.email}`)
  }
  return <Session type={SIGNUP} onSuccess={onSuccess} />
}

export default SignUp
