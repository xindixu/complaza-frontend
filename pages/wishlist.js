import React, { useState, useEffect, useContext, useCallback } from "react"
import { API } from "aws-amplify"
import { Row, Col, Typography, Button, Empty, Input, message } from "antd"
import { useRouter } from "next/router"
import qs from "qs"
import AuthContext from "../context/auth"
import Card from "../components/product/card"
import Loader from "../components/product/loader"
import { deleteWishlist, postWishlist } from "../lib/wishlist"
import withProtectedRoute from "../components/protected-route"

const { Title, Text } = Typography

function Wishlist() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { userId, token } = useContext(AuthContext)
  const [isTextSearchError, setIsTextSearchError] = useState(false)
  const [textQuery, setTextQuery] = useState("")

  const queryFromWishlist = useCallback(
    (query) => {
      if (!userId || !token) {
        return
      }
      setIsLoading(true)
      const params = {
        q: query,
      }
      const link = query
        ? `/search/wishlist/${userId}?${qs.stringify(params)}`
        : `/wishlist/${userId}`

      API.get("default", link, {
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
    },
    [token, userId]
  )

  useEffect(() => {
    queryFromWishlist()
  }, [queryFromWishlist, token, userId])

  const addToWishlist = useCallback(
    (item) => {
      if (!token) {
        // This shouldn't happen
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
      })
    },
    [token, userId]
  )

  const removeFromWishlist = useCallback(
    (item, index) => {
      if (!token) {
        // This shouldn't happen
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

  const onTextSearch = useCallback(() => {
    setIsTextSearchError(false)

    if (textQuery === "") {
      setIsTextSearchError(true)
      return
    }

    queryFromWishlist(textQuery)
  }, [queryFromWishlist, textQuery])

  const onTextClear = useCallback(() => {
    setTextQuery("")
    queryFromWishlist("")
  }, [queryFromWishlist])

  const onClickProduct = (id) => {
    router.push(`/products/${id}`)
  }

  return (
    <div>
      <Title>Wishlist</Title>

      <Row gutter={16} className="tw-mb-5">
        <Col flex="auto">
          <Input
            status={isTextSearchError ? "error" : ""}
            placeholder="Search by text"
            value={textQuery}
            onChange={(e) => setTextQuery(e.target.value)}
            onPressEnter={onTextSearch}
          />
          {isTextSearchError && <Text type="danger">Please enter some text</Text>}
        </Col>
        <Col flex="64px">
          <Button type="primary" onClick={onTextSearch}>
            Search
          </Button>
        </Col>
        <Col flex="64px">
          <Button type="default" onClick={onTextClear} disabled={textQuery === ""}>
            Clear
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader wrap />
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

export default withProtectedRoute(Wishlist)
