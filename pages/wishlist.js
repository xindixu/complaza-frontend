import React, { useState, useEffect, useContext, useCallback } from "react"
import { API } from "aws-amplify"
import { Row, Col, Typography } from "antd"
import { useRouter } from "next/router"
import AuthContext from "../context/auth"
import Card from "../components/product/card"
import { deleteWishlist, postWishlist } from "../lib/wishlist"

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

    postWishlist({ userId, token, item }).then((res) => {
      if (res.statusCode !== 200) {
        console.log("error")
      }
      console.log(res)
    })
  }, [])

  const removeFromWishlist = useCallback((item, index) => {
    if (!token) {
      // TODO: show please log in pop up
      console.log("please log in")
      return
    }

    if (!item) {
      return
    }

    deleteWishlist({ userId, token, item }).then((res) => {
      if (res.statusCode !== 200) {
        console.log("error")
        return
      }

      setItems((prevItems) => [...prevItems.slice(0, index), ...prevItems.slice(index + 1)])
    })
  }, [])

  return (
    <div>
      <Title>Wishlist</Title>

      <Row gutter={16}>
        {items?.map((item, index) => {
          const { id, link, name, image, price, retailer } = item
          return (
            <Col key={id} className="tw-mb-5">
              <Card
                name={name}
                image={image}
                price={price}
                link={link}
                retailerName={retailer}
                starred
                addToWishlist={() => addToWishlist(item, index)}
                removeFromWishlist={() => removeFromWishlist(item, index)}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Wishlist
