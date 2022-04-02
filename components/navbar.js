import React from "react"
import Link from "next/link"
import { Layout, Menu } from "antd"
import { UserSwitchOutlined } from "@ant-design/icons"
import Image from "next/image"
import styled from "styled-components"

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

const Navbar = () => {
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
        <UserWrapper>
          <UserSwitchOutlined />
        </UserWrapper>
      </Menu>
    </Header>
  )
}

Navbar.propTypes = {}

export default Navbar
