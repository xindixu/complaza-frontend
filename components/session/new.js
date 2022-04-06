/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import NextLink from "next/link"
import { Form, Input, Button, Typography } from "antd"

const { Text, Link } = Typography

export const LOGIN = "LOGIN"
export const SIGNUP = "SIGNUP"
export const CONFIRM = "CONFIRM"

const BUTTON_TEXT = {
  LOGIN: "Login",
  SIGNUP: "Sign up",
  CONFIRM: "Confirm sign up",
}

function NewSession({ type, onSubmit, initialValues }) {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log("Success:", values)
    onSubmit(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  useEffect(() => form.resetFields(), [form, initialValues])

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
        <Input />
      </Form.Item>

      {type === CONFIRM ? (
        <Form.Item label="Code" name="code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      ) : (
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
      )}

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
        ) : type === SIGNUP ? (
          <Text type="secondary">
            Already a Complaza user? Please{" "}
            <NextLink href="/login" passHref>
              <Link>{BUTTON_TEXT[LOGIN]}</Link>
            </NextLink>
            .
          </Text>
        ) : (
          <Text type="secondary">
            Already verified? Please{" "}
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
  type: PropTypes.oneOf([LOGIN, SIGNUP, CONFIRM]).isRequired,
}

export default NewSession
