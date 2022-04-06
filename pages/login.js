import React, { useState } from "react"
import { Auth } from "aws-amplify"

import { Button, notification } from "antd"
import NewSession, { LOGIN } from "../components/forms/session"
import { signIn } from "../lib/auth"

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

function Login(props) {
  const onSubmit = async (values) => {
    try {
      const { user } = await signIn(values)
      console.log(user)
    } catch (err) {
      console.log(err.message)
      openNotification(err.message)
    }
  }
  return <NewSession type={LOGIN} onSubmit={onSubmit} />
}

export default Login
