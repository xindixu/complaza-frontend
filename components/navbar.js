import React, { useContext } from "react"
import Link from "next/link"
import { Layout, Menu, Dropdown, Button } from "antd"
import { UserSwitchOutlined } from "@ant-design/icons"
import Image from "next/image"
import styled from "styled-components"
import AuthContext from "../context/auth"

const { Header } = Layout

const LogoWrapper = styled.div`
  padding: 0;
  margin-right: 32px;
  display: flex;
  align-items: center;
`

const UserWrapper = styled(Menu.Item)`
  margin-left: auto;
`

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext)

  const menu = (
    <Menu selectable>
      <Menu.Item key={1}>
        <Link href="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      {isLoggedIn ? (
        <Menu.Item key={2} danger>
          <Link href="/logout">Logout</Link>
        </Menu.Item>
      ) : (
        <Menu.Item key={3}>
          <Link href="/login">Login</Link>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <Header
      style={{ position: "fixed", zIndex: 1, width: "100%", display: "flex", alignItems: "center" }}
    >
      <LogoWrapper>
        <Image src="/logo.png" alt="complaza logo" height="32" width="32" />
      </LogoWrapper>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ width: "100%" }}>
        <Menu.Item key={1}>
          <Link href="/">Search</Link>
        </Menu.Item>
        <Menu.Item key={2}>
          <Link href="/">History</Link>
        </Menu.Item>
        <Dropdown overlay={menu} placement="bottomLeft">
          <UserWrapper key={3}>
            <UserSwitchOutlined />
          </UserWrapper>
        </Dropdown>
      </Menu>
    </Header>
  )
}

export default Navbar
