import React, { useState, useEffect, useContext } from "react"
import { API } from "aws-amplify"
import { Row, Col, Typography } from "antd"
import AuthContext from "../context/auth"
import Card from "../components/product/card"

const { Title } = Typography

function Wishlist(props) {
  const [items, setItems] = useState([])
  const { userId, token } = useContext(AuthContext)

  useEffect(() => {
    if (!userId || !token) {
      return
    }

    API.get("default", `/wishlist/${userId}`, {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.statusCode !== 200) {
        console.log("error")
      }

      setItems(res.body.items)
    })
  }, [token, userId])

  return (
    <div>
      <Title>Wishlist</Title>

      <Row gutter={16}>
        {items?.map(({ id, name, imageUrl, price, dateAdded }) => (
          <Col key={id}>
            <Card name={name} imageUrl={imageUrl} price={price} retailerName="Amazon" starred />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Wishlist
