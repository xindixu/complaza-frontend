import React, { useEffect, useState, useCallback, useContext } from "react"
import { useRouter } from "next/router"
import { Row, Col, Image } from "antd"
import { API, Storage } from "aws-amplify"
import ExpandableRow from "../components/product/expandable-row"
import AuthContext from "../context/auth"
import { deleteWishlist, postWishlist } from "../lib/wishlist"

const RETAILERS = [
  { name: "Amazon", url: "https://amazon.com" },
  { name: "Ebay", url: "https://ebay.com" },
  { name: "Alibaba", url: "https://alibaba.com" },
  { name: "Shopee", url: "https://shopee.com" },
]

function Result() {
  const [itemsByRetailer, setItemsByRetailer] = useState({})
  const [isSearching, setIsSearching] = useState(true)
  const [imageLink, setImageLink] = useState("")
  const { userId, token } = useContext(AuthContext)

  const router = useRouter()
  const { q, image, bucket } = router.query

  useEffect(() => {
    setIsSearching(true)

    if (!q) {
      return
    }

    const link = userId
      ? `/search?q=${q}&sort_by=price&uid=${userId}`
      : `/search?q=${q}&sort_by=price`

    API.get("default", link).then((res) => {
      if (res.statusCode !== 200) {
        console.log("error", res)
        return
      }

      setItemsByRetailer(res.body.items)
      setIsSearching(false)
    })
  }, [q, userId])

  useEffect(() => {
    if (!image || !bucket) {
      return
    }
    console.log(image, bucket)
    Storage.get(image, {
      bucket,
      region: "us-east-1",
    }).then(setImageLink)
  }, [bucket, image])

  const addToWishlist = useCallback(
    (item, index) => {
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
          return
        }
        console.log(res)
        const { retailer } = item
        setItemsByRetailer((prevRetailers) => ({
          ...prevRetailers,
          [item.retailer]: [
            ...prevRetailers[retailer].slice(0, index),
            { ...item, starred: true },
            ...prevRetailers[retailer].slice(index + 1),
          ],
        }))
      })
    },
    [token, userId]
  )

  const removeFromWishlist = useCallback(
    (item, index) => {
      console.log(item)
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

        const { retailer } = item
        setItemsByRetailer((prevRetailers) => ({
          ...prevRetailers,
          [item.retailer]: [
            ...prevRetailers[retailer].slice(0, index),
            { ...item, starred: false },
            ...prevRetailers[retailer].slice(index + 1),
          ],
        }))
      })
    },
    [token, userId]
  )

  return (
    <div>
      <Row wrap={false} gutter={16}>
        <Col flex="200px">
          <p>
            Keyword: <strong>&ldquo;{q}&rdquo;</strong>
          </p>

          {imageLink && (
            <>
              <p>Image:</p>
              <Image src={imageLink} alt="image uploaded for search" />
            </>
          )}
        </Col>
        <Col flex="auto">
          {RETAILERS.map(({ name }) => (
            <ExpandableRow
              key={name}
              isSearching={isSearching}
              retailerName={name}
              items={itemsByRetailer[name]}
              addToWishlist={addToWishlist}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default Result
