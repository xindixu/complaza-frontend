import React, { useEffect, useState } from "react"
import { notification, Spin } from "antd"
import { useRouter } from "next/router"
import NewSession, { CONFIRM } from "../components/session/new"
import { confirmSignUp } from "../lib/auth"

const openNotification = (msg) => {
  notification.open({
    message: "Confirm Sign Up Failed",
    description: msg,
    duration: 0,
    onClick: () => {
      console.log("Notification Clicked!")
    },
  })
}

function Confirm(props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialEmail, setInitialEmail] = useState("")

  useEffect(() => {
    const { email } = router.query

    if (email) {
      setInitialEmail(email)
    }
  }, [router.query, router.query.email])

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true)
      const { user } = await confirmSignUp(values)
      console.log(user)
    } catch (err) {
      openNotification(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const content = (
    <NewSession type={CONFIRM} onSubmit={onSubmit} initialValues={{ email: initialEmail }} />
  )
  return isSubmitting ? <Spin>{content}</Spin> : content
}

export default Confirm
