import React, { useEffect, useState, useCallback, useContext } from "react"
import { useRouter } from "next/router"
import { Row, Col } from "antd"
import { API } from "aws-amplify"
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
  const { userId, token } = useContext(AuthContext)

  const router = useRouter()
  const { q } = router.query

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
      <Row wrap={false}>
        <Col flex="200px">Result for &ldquo;{q}&rdquo;</Col>
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
