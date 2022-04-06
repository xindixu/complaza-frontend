import React from "react"
import { useRouter } from "next/router"
import Session from "../components/session"
import { LOGIN } from "../components/session/form"

function LogIn() {
  const router = useRouter()

  const onSuccess = (user) => {
    router.push("/")
  }

  return <Session type={LOGIN} onSuccess={onSuccess} />
}

export default LogIn
