import React, { useState, useEffect, useContext, useCallback } from "react"
import { API } from "aws-amplify"
import { Row, Col, Typography, Empty, message } from "antd"
import { useRouter } from "next/router"
import AuthContext from "../context/auth"
import Card from "../components/product/card"
import Loader from "../components/product/loader"
import { deleteWishlist, postWishlist } from "../lib/wishlist"

const { Title } = Typography

function Wishlist() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { userId, token, isLoggedIn, userLoaded } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn && userLoaded) {
      router.push("/login?hint=true")
    }
  }, [router, isLoggedIn, userLoaded])

  useEffect(() => {
    setIsLoading(true)
    if (!userId || !token) {
      return
    }

    API.get("default", `/wishlist/${userId}`, {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      if (res.statusCode !== 200) {
        console.error("error")
      }

      setItems(res.body.items)
      setIsLoading(false)
    })
  }, [token, userId])

  const addToWishlist = useCallback(
    (item) => {
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
          console.error("error")
        }
        console.log(res)
      })
    },
    [token, userId]
  )

  const removeFromWishlist = useCallback(
    (item, index) => {
      if (!token) {
        // TODO: show please log in pop up
        message.error("Please log in")
        return
      }

      if (!item) {
        return
      }

      deleteWishlist({ userId, token, item }).then((res) => {
        if (res.statusCode !== 200) {
          console.error("error")
          return
        }

        setItems((prevItems) => [...prevItems.slice(0, index), ...prevItems.slice(index + 1)])
      })
      message.success("Removed from your wishlist")
    },
    [token, userId]
  )

  const onClickProduct = (id) => {
    router.push(`/products/${id}`)
  }

  return (
    <div>
      <Title>Wishlist</Title>
      {isLoading ? (
        <Loader />
      ) : items.length ? (
        <Row gutter={16}>
          {items?.map((item, index) => {
            const { id, link, name, image, price, retailer } = item
            return (
              <Col key={id} className="tw-mb-5">
                <Card
                  onClick={() => onClickProduct(item.id)}
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
      ) : (
        <Empty
          description={
            <span>
              You haven&apos;t added anything to your wishlist. You can do so in the search results
              page.
            </span>
          }
        />
      )}
    </div>
  )
}

export default Wishlist
