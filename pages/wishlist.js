import React, { useState, useEffect, useContext, useCallback } from "react"
import { API } from "aws-amplify"
import { Row, Col, Typography } from "antd"
import { useRouter } from "next/router"
import AuthContext from "../context/auth"
import Card from "../components/product/card"

const { Title } = Typography

function Wishlist() {
  const [items, setItems] = useState([])
  const { userId, token, isLoggedIn } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login?hint=true")
    }
  }, [isLoggedIn, router])

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

  const addToWishlist = useCallback((item) => {
    if (!token) {
      // TODO: show please log in pop up
      console.log("please log in")
      return
    }

    if (!item) {
      return
    }

    API.post("default", `/wishlist/${userId}`, {
      body: { item: { name: item.name, image: item.image, price: item.price, item: item.link } },
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.statusCode !== 200) {
        console.log("error")
      }
      console.log(res)
    })
  }, [])

  return (
    <div>
      <Title>Wishlist</Title>

      <Row gutter={16}>
        {items?.map((item) => {
          const { id, name, image, price, dateAdded } = item
          return (
            <Col key={id} className="tw-mb-5">
              <Card
                name={name}
                image={image}
                price={price}
                retailerName="Amazon"
                starred
                addToWishlist={() => addToWishlist(item)}
                removeFromWishlist={() => addToWishlist(item)}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Wishlist
