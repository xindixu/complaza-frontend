import React, { useEffect, useState } from "react"
import { notification, Spin } from "antd"
import { confirmSignUp, signUp, signIn } from "../../lib/auth"
import NewSession, { CONFIRM, SIGNUP, LOGIN } from "./form"

const TITLES = {
  CONFIRM: "Confirm Sign Up Failed",
  SIGNUP: "Sign Up Failed",
  LOGIN: "Log In Failed",
}

const KEY = "session-create-error"
const openNotification = (title, msg) => {
  notification.error({
    message: title,
    description: msg,
    duration: 0,
    onClick: () => {
      console.log("Notification Clicked!")
    },
    key: KEY,
  })
}

const ACTION = {
  CONFIRM: confirmSignUp,
  SIGNUP: signUp,
  LOGIN: signIn,
}

function Session({ type, initialEmail }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    return () => {
      notification.close(KEY)
    }
  }, [])

  const onSubmit = async (values) => {
    try {
      notification.close(KEY)
      setIsSubmitting(true)
      const { user } = await ACTION[type](values)
      console.log(user)
    } catch (err) {
      openNotification(TITLES[type], err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const content = (
    <NewSession type={type} onSubmit={onSubmit} initialValues={{ email: initialEmail }} />
  )
  return isSubmitting ? <Spin>{content}</Spin> : content
}

export default Session
