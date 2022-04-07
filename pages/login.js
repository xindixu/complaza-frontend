import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { message } from "antd"
import Session from "../components/session"
import { LOGIN } from "../components/session/form"

function LogIn() {
  const router = useRouter()

  const showHint = router.query.hint

  useEffect(() => {
    if (showHint) {
      message.warning("Please log in first")
    }
  }, [showHint])

  const onSuccess = () => {
    router.push("/")
  }

  return <Session type={LOGIN} onSuccess={onSuccess} />
}

export default LogIn
