import React, { useEffect, useState, useCallback, useContext } from "react"
import { useRouter } from "next/router"
import { Row, Col } from "antd"
import { API } from "aws-amplify"
import ExpandableRow from "../components/product/expandable-row"
import AuthContext from "../context/auth"

function Result() {
  const [itemsByRetailer, setItemsByRetailer] = useState({})
  const [retailers, setRetailers] = useState([])
  const { userId, token } = useContext(AuthContext)

  const router = useRouter()
  const { q } = router.query

  useEffect(() => {
    if (!q) {
      return
    }

    API.get("default", `/search?q=${q}&sort_by=price`).then((res) => {
      if (res.statusCode !== 200) {
        console.log("error")
        return
      }

      const { items, retailers } = res.body
      setRetailers(retailers)
      setItemsByRetailer(items)
    })
  }, [q])

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
      body: { item: { name: item.name, image: item.image, price: item.price } },
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

  const removeFromWishlist = useCallback((item) => {
    console.log(item)
  }, [])

  return (
    <div>
      <Row wrap={false}>
        <Col flex="200px">Result for &ldquo;{q}&rdquo;</Col>
        <Col flex="auto">
          {retailers.map(({ name }) => (
            <ExpandableRow
              key={name}
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
