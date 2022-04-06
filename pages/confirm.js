import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Session from "../components/session"
import { CONFIRM } from "../components/session/form"

function Confirm() {
  const router = useRouter()
  const [initialEmail, setInitialEmail] = useState("")

  useEffect(() => {
    const { email } = router.query

    if (email) {
      setInitialEmail(email)
    }
  }, [router.query, router.query.email])

  const onSuccess = () => router.push("/login")
  return <Session type={CONFIRM} initialEmail={initialEmail} onSuccess={onSuccess} />
}

export default Confirm
