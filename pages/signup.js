import React from "react"
import { notification } from "antd"
import { useRouter } from "next/router"
import NewSession, { SIGNUP } from "../components/session/new"
import { signUp } from "../lib/auth"

const openNotification = (msg) => {
  notification.open({
    message: "Log In Failed",
    description: msg,
    duration: 0,
    onClick: () => {
      console.log("Notification Clicked!")
    },
  })
}

function SignUp(props) {
  const router = useRouter()
  const onSubmit = async (values) => {
    try {
      const { user } = await signUp(values)
      console.log(user)
      router.push(`/confirm?email=${user.email}`)
    } catch (err) {
      console.log(err.message)
      openNotification(err.message)
    }
  }

  const content = <NewSession type={SIGNUP} onSubmit={onSubmit} />
  return <div>{content}</div>
}

export default SignUp
