/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import PropTypes from "prop-types"
import NextLink from "next/link"
import { Form, Input, Button, Typography } from "antd"

const { Text, Link } = Typography

export const LOGIN = "LOGIN"
export const SIGNUP = "SIGNUP"
const BUTTON_TEXT = {
  LOGIN: "Login",
  SIGNUP: "Sign up",
}

function NewSession({ type, onSubmit }) {
  const onFinish = (values) => {
    console.log("Success:", values)
    onSubmit(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {type === LOGIN ? (
          <Text type="secondary">
            New to Complaza? Please{" "}
            <NextLink href="/signup" passHref>
              <Link>{BUTTON_TEXT[SIGNUP]}</Link>
            </NextLink>
            .
          </Text>
        ) : (
          <Text type="secondary">
            Already a Complaza user? Please{" "}
            <NextLink href="/login" passHref>
              <Link>{BUTTON_TEXT[LOGIN]}</Link>
            </NextLink>
            .
          </Text>
        )}
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {BUTTON_TEXT[type]}
        </Button>
      </Form.Item>
    </Form>
  )
}

NewSession.propTypes = {
  type: PropTypes.oneOf([LOGIN, SIGNUP]).isRequired,
}

export default NewSession
